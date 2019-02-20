import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Button, Modal, ModalHeader, ModalBody, Input, FormFeedback, FormGroup, Label } from "reactstrap";
import moment from "moment";
import * as Yup from "yup";

import { FloatButton, ErrorMsg } from "../components";
import { saveExpense } from "../actions";

class AddFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidUpdate() {
    const { saved, errorMsg } = this.props;
    const { modal } = this.state;

    if (errorMsg) {
      this.bag.setSubmitting(false);
    }

    if (saved && modal) {
      this.toggle();
      this.bag.resetForm();
    }
  }

  _onSubmit(values, bag) {
    this.props.saveExpense(values);
    this.bag = bag;
    console.log(values);
  }

  render() {
    const now = moment().format("YYYY-MM-DD");
    return (
      <div>
        <FloatButton floatBtnClicked={this.toggle} />
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add New</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{ amount: "", created: now }}
              onSubmit={this._onSubmit.bind(this)}
              validationSchema={Yup.object().shape({
                amount: Yup.number().min(1).required(),
                created: Yup.date().required()
              })}
              render={({ errors, touched, handleBlur, handleChange, values, handleSubmit, isValid, isSubmitting }) => (
                <div>
                  <ErrorMsg />
                  <FormGroup>
                    <Label>Amount</Label>
                    <Input
                      invalid={errors.amount && touched.amount}
                      name="amount"
                      type="number"
                      value={values.amount}
                      placeholder="Enter Amount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.amount && touched.amount && (
                      <FormFeedback>{errors.amount}</FormFeedback>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Date</Label>
                    <Input
                      invalid={errors.created && touched.created}
                      name="created"
                      type="date"
                      value={values.created}
                      placeholder="Enter Amount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.created && touched.created && (
                      <FormFeedback>{errors.created}</FormFeedback>
                    )}
                  </FormGroup>

                  <Button
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!isValid || isSubmitting}> Save </Button>
                </div>
              )}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ expense, error }) => {
  return {
    saved: expense.saved,
    errorMsg: error.message
  };
};

const AddForm = connect(mapStateToProps, { saveExpense })(AddFormComponent);

export default AddForm;
