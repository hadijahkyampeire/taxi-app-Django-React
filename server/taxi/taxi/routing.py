from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

from trips.consumers import TaxiConsumer
from .middleware import TokenAuthMiddlewareStack

application = ProtocolTypeRouter({
  'websocket': TokenAuthMiddlewareStack( 
    URLRouter([
        path('taxi/', TaxiConsumer),
    ])
    ),
})