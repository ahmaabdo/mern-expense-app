import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";

class Login extends Component {
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h3>Sign in</h3>
        <hr />
        <FormGroup>
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="youremail@example.com"
            onChange={e => console.log(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input name="password" type="password" placeholder="Your password" />
        </FormGroup>
        <Button color="primary" blockj>
          Sign In
        </Button>
      </div>
    );
  }
}

export { Login };
