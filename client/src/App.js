import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import { LogIn, SignUp } from 'components';

function App() {
  return (
    <>
      <Navbar bg="light" expand="lg" variant="light">
        <LinkContainer to="/">
          <Navbar.Brand className="logo">Taxi</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse></Navbar.Collapse>
      </Navbar>
      <Container className="pt-3">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className='middle-center'>
                <h1>Taxi</h1>
                <Link className='btn btn-primary' to="/sign-up">Sign up</Link>
                <Link className='btn btn-primary' to="/log-in">Log in</Link>
              </div>
            )}
          />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/log-in" component={LogIn} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
