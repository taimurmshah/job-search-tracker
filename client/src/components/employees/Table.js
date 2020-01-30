import React, { Component } from "react";
import { connect } from "react-redux";
import { updateEmployeeThunk } from "../../redux/thunks/employee";
import Employee from "./Employee";
import Loading from "../layout/Loading";
import { HeaderContainer } from "../resusable-components/styledComponents";
import styled from "styled-components";

class Table extends Component {
  render() {
    console.log("Table is mounted, here are the props:", this.props);

    if (!this.props.employees) {
      return <Loading />;
    }

    const tableData = this.props.employees.map(e => {
      return (
        <Employee
          key={e._id}
          employee={e}
          addEmailButtonClickHandler={this.props.addEmailButtonClickHandler}
          sendEmailButtonClickHandler={this.props.sendEmailButtonClickHandler}
          showSmallModal={this.props.showSmallModal}
        />
      );
    });

    return (
      <div className="employees-table">
        <StyledTable>
          <thead>
            <tr>
              <TH>Name</TH>
              <TH>Position</TH>
              <TH>LinkedIn</TH>
              <TH>Response</TH>
              <TH>Email</TH>
              <TH>Emails Sent</TH>
              <TH>Action</TH>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </StyledTable>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEmployeeThunk: (jobId, employeeId, updates) =>
      dispatch(updateEmployeeThunk(jobId, employeeId, updates))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Table);

const StyledTable = styled.table`
  font-size: 16px;
  border: none;
  padding: 3px;
  border-collapse: collapse;
  font-family: "Bitter", serif;
  background-color: rgb(15, 174, 241);
`;

const TH = styled.th`
  border: none;
  font-size: 18px;
`;
