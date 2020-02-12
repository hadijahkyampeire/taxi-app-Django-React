import React, { useState } from 'react';
import { Formik } from 'formik';
import { Breadcrumb, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

function SignUp (props) {
  const [isSubmitted, setSubmitted] = useState(false);
  const onSubmit = (values, actions) => setSubmitted(true);

  if (isSubmitted) {
    return <Redirect to='/log-in' />;
  }
  return (
    <Row>
      <Col lg={12}>
        <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Sign up</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>Sign up</Card.Header>
          <Card.Body>
          <Formik
              initialValues={{
                username: '',
                firstName: '',
                lastName: '',
                password: '',
                group: 'rider',
                photo: []
              }}
              onSubmit={onSubmit}
            >
              {({
                handleChange,
                handleSubmit,
                values
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId='username'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      name='username'
                      onChange={handleChange}
                      values={values.username}
                    />
                  </Form.Group>
                  <Form.Group controlId='firstName'>
                    <Form.Label>First name:</Form.Label>
                    <Form.Control
                      name='firstName'
                      onChange={handleChange}
                      values={values.firstName}
                    />
                  </Form.Group>
                  <Form.Group controlId='lastName'>
                    <Form.Label>Last name:</Form.Label>
                    <Form.Control
                      name='lastName'
                      onChange={handleChange}
                      values={values.lastName}
                    />
                  </Form.Group>
                  <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      name='password'
                      onChange={handleChange}
                      type='password'
                      value={values.password}
                    />
                  </Form.Group>
                  <Form.Group controlId='group'>
                    <Form.Label>Group:</Form.Label>
                    <Form.Control
                      as='select'
                      name='group'
                      onChange={handleChange}
                      value={values.group}
                    >
                      <option value='rider'>Rider</option>
                      <option value='driver'>Driver</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='photo'>
                    <Form.Label>Photo:</Form.Label>
                    <Form.Control
                      name='photo'
                      onChange={handleChange}
                      type='file'
                      value={values.photo}
                    />
                  </Form.Group>
                  <Button block type='submit' variant='primary'>Sign up</Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
          <p className='mt-3 text-center'>
            Already have an account? <Link to='/log-in'>Log in!</Link>
          </p>
        </Card>
      </Col>
    </Row>
  );
}

export { SignUp };