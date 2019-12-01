import React, { Component } from "react";
import { connect } from "react-redux";
import {
  FormContainer,
  InputContainer,
  Input
} from "../resusable-components/styledComponents";

class NewEmployee extends Component {
  state = {
    firstName: "",
    lastName: "",
    position: "",
    linkedIn: "",
    email: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    let employee = {
      name: this.state.firstName + " " + this.state.lastName,
      position: this.state.position,
      linkedIn: this.state.linkedIn,
      email: this.state.email
    };

    this.props.submitHandler(employee);
  };

  render() {
    return (
      <div>
        <FormContainer onSubmit={this.submitHandler}>
          <InputContainer>
            <p>First Name:</p>
            <Input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.changeHandler}
            />
            <p>Last Name:</p>
            <Input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.changeHandler}
            />
            <p>Position:</p>
            <Input
              type="text"
              name="position"
              value={this.state.position}
              onChange={this.changeHandler}
            />
            <p>LinkedIn Profile:</p>
            <Input
              type="text"
              name="linkedIn"
              value={this.state.linkedIn}
              onChange={this.changeHandler}
            />
            <p>Email: (not required)</p>
            <Input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.changeHandler}
            />
          </InputContainer>
          <div className="modal-buttons">
            <button className="button" type="submit">
              Submit
            </button>
            <button className="button" onClick={this.props.closeModal}>
              Close
            </button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // newEmployeeThunk: (employee, token) =>
    //   dispatch(newEmployeeThunk(employee, token))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewEmployee);

// const NewEmployeeForm = styled(FormContainer)`
//   height: 100%;
// `;
