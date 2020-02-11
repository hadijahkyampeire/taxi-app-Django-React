from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from .serializers import TripSerializer, NestedTripSerializer
from trips.models import Trip


class TaxiConsumer(AsyncJsonWebsocketConsumer):
  @database_sync_to_async
  def _get_user_group(self, user):
    return user.groups.first().name

  @database_sync_to_async
  def _get_trip_ids(self, user):
    user_groups = user.groups.values_list('name', flat=True)
    if 'driver' in user_groups:
        trip_ids = user.trips_as_driver.exclude(
            status=Trip.COMPLETED
        ).only('id').values_list('id', flat=True)
    else:
        trip_ids = user.trips_as_rider.exclude(
            status=Trip.COMPLETED
        ).only('id').values_list('id', flat=True)
    return map(str, trip_ids)

  async def connect(self):
    user = self.scope['user']
    if user.is_anonymous:
      await self.close()
    else:
      user_group = await self._get_user_group(user)
      if user_group == 'driver':
        await self.channel_layer.group_add(
                  group='drivers',
                  channel=self.channel_name
              )
      for trip_id in await self._get_trip_ids(user):
        await self.channel_layer.group_add(
            group=trip_id,
            channel=self.channel_name
        )
      await self.accept()

  async def disconnect(self, code):
    user = self.scope['user']
    user_group = await self._get_user_group(user)
    if user_group == 'driver':
        await self.channel_layer.group_discard(
            group='drivers',
            channel=self.channel_name
        )
    for trip_id in await self._get_trip_ids(user):
            await self.channel_layer.group_discard(
                group=trip_id,
                channel=self.channel_name
            )
    await super().disconnect(code)

  async def receive_json(self, content, **kwargs):
    message_type = content.get('type')
    if message_type == 'create.trip':
        await self.create_trip(content)
    elif message_type == 'echo.message':
        await self.echo_message(content)
    elif message_type == 'update.trip': 
        await self.update_trip(content)

  async def update_trip(self, message):
    data = message.get('data')
    trip = await self._update_trip(data)
    trip_id = f'{trip.id}'
    trip_data = NestedTripSerializer(trip).data

    # Send update to rider.
    await self.channel_layer.group_send(
        group=trip_id,
        message={
            'type': 'echo.message',
            'data': trip_data,
        }
    )

    # Add driver to the trip group.
    await self.channel_layer.group_add(
        group=trip_id,
        channel=self.channel_name
    )

    await self.send_json({
        'type': 'echo.message',
        'data': trip_data
    })

  async def create_trip(self, message):
    data = message.get('data')
    trip = await self._create_trip(data)
    trip_data = NestedTripSerializer(trip).data
    # Send rider requests to all drivers.
    await self.channel_layer.group_send(group='drivers', message={
        'type': 'echo.message',
        'data': trip_data
    })

    # Add rider to trip group.
    await self.channel_layer.group_add(
        group=f'{trip.id}',
        channel=self.channel_name
    )

    await self.send_json({
        'type': 'echo.message',
        'data': trip_data,
    })

  async def echo_message(self, message):
    await self.send_json(message)
  
  @database_sync_to_async
  def _create_trip(self, data):
    serializer = TripSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    return serializer.create(serializer.validated_data)

  @database_sync_to_async
  def _update_trip(self, data):
    instance = Trip.objects.get(id=data.get('id'))
    serializer = TripSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    return serializer.update(instance, serializer.validated_data)

# TODOs
# We've finished coding and testing some basic user workflows, but there are many other feature enhancements that we could add. Using what you learned, can you figure out how to program these common scenarios?

# The rider cancels his request after a driver accepts it.
# The server alerts all other drivers in the driver pool that someone has accepted a request.
# The driver periodically broadcasts his location to the rider during a trip.
# The server only allows a rider to request one trip at a time.
# The rider can share his trip with another rider, who can join the trip and receive updates.
# The server only shares a trip request to drivers in a specific geographic location.
# If no drivers accept the request within a certain timespan, the server cancels the request and returns a message to the rider.
