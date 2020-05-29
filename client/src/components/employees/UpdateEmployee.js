import React, { Component } from "react";
import { connect } from "react-redux";
import {
  HeaderContainer,
  FormContainer,
  InputContainer,
  Input,
  TableButton
} from "../resusable-components/styledComponents";
import { updateEmployeeThunk } from "../../redux/thunks/employee";
import styled from "styled-components";

class UpdateEmployee extends Component {
  state = {
    firstName: this.props.employee.name.split(" ")[0],
    lastName: this.props.employee.name.split(" ")[1],
    position: this.props.employee.position,
    linkedIn: this.props.employee.linkedIn,
    email: this.props.employee.email
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

    this.props.updateEmployeeThunk(
      this.props.jobId,
      this.props.employee._id,
      employee
    );

    this.props.closeModal();
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
              autoComplete="off"
              value={this.state.firstName}
              onChange={this.changeHandler}
              required
            />
            <p>Last Name:</p>
            <Input
              type="text"
              name="lastName"
              autoComplete="off"
              value={this.state.lastName}
              onChange={this.changeHandler}
              required
            />
            <p>Position:</p>
            <Input
              type="text"
              name="position"
              value={this.state.position}
              onChange={this.changeHandler}
              required
            />
            <p>LinkedIn Profile:</p>
            <Input
              type="text"
              name="linkedIn"
              autoComplete="off"
              value={this.state.linkedIn}
              onChange={this.changeHandler}
              required
            />
            <p>Email: (not required)</p>
            <Input
              type="text"
              name="email"
              autoComplete="off"
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

const mapStateToProps = state => {
  return {
    jobId: state.job.currentJob._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEmployeeThunk: (jobId, employeeId, updates) =>
      dispatch(updateEmployeeThunk(jobId, employeeId, updates))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateEmployee);

const DeleteButton = styled(TableButton)`
  background-color: red;
  :hover {
    box-shadow: 0;
    background-color: #edadad;
  }
`;
