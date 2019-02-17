import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { Home, Login, SignUp } from "./pages";
import { NavBar, ProtectedRoute } from "./components";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Switch>
            {/* ProtectedRoute is the pages that the user cannot access it if he not authorized or logged in*/}
            <ProtectedRoute path="/" component={Home} exact />
          </Switch>

          {/* <Route path="/" component={Home} exact /> */}
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={SignUp} exact />
        </Container>
      </div>
    );
  }
}

export default App;
