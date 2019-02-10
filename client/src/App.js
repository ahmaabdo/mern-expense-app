import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Container } from "reactstrap";
import { Home, Login, SignUp } from "./pages";
import { NavBar } from "./components/NavBar";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={SignUp} exact />
        </Container>
      </div>
    );
  }
}

export default App;
