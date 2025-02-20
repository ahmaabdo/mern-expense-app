import React, { Component } from "react";
import { Button, FormGroup, Label, Input, FormFeedback, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";

import { signIn } from "../actions";

class LoginPage extends Component {
  componentDidUpdate() {
    const { error, isAuth } = this.props;
    if (error && this.bag) {
      this.bag.setSubmitting(false);
    }
    if (isAuth) {
      this.props.history.push("/");
    }
  }
  _handleFormSubmit(values, bag) {
    this.props.signIn(values);
    this.bag = bag;
  }
  _renderErrorIfAny() {
    const { error } = this.props;
    if (error) {
      return <Alert color="danger">{error}</Alert>;
    }
  }
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h3>Sign in</h3>
        <hr />

        {this._renderErrorIfAny()}

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={this._handleFormSubmit.bind(this)}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string()
              .min(6)
              .required()
          })}
          render={({ handleChange, handleSubmit, isValid, isSubmitting, handleBlur, errors, touched }) => (
            <div>
              <FormGroup>
                <Label>Email address</Label>
                <Input
                  invalid={errors.email && touched.email}
                  name="email"
                  type="email"
                  placeholder="mail@example.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <FormFeedback>{errors.email}</FormFeedback>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <Input
                  invalid={errors.password && touched.password}
                  name="password"
                  type="password"
                  placeholder="********"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <FormFeedback>{errors.password}</FormFeedback>
                ) : null}
              </FormGroup>

              <Button
                color="primary"
                block
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
              >
                Sign In
              </Button>
            </div>
          )}
        />
        <Link to="/signup">Do not have an account? Sign up now</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    attempting: auth.attempting,
    error: auth.error,
    isAuth: auth.isAuth
  };
};
const Login = connect(mapStateToProps, { signIn })(LoginPage);

export { Login };
