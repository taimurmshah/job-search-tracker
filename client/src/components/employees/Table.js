import React, { Component } from "react";
import { connect } from "react-redux";
import { updateEmployeeThunk } from "../../redux/thunks/employee";
import Employee from "./Employee";
import Loading from "../layout/Loading";
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
      <Div>
        <StyledTable>
          <THead>
            <tr>
              <TH>Name</TH>
              <TH>Position</TH>
              <TH>LinkedIn</TH>
              <TH>Response</TH>
              <TH>Email</TH>
              <TH>Emails Sent</TH>
              <TH>Action</TH>
            </tr>
          </THead>
          <tbody>{tableData}</tbody>
        </StyledTable>
      </Div>
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

const Div = styled.div`
  display: flex;
  width: 100%
  flex-direction: row;
  justify-content: center;
`;

const StyledTable = styled.table`
  font-size: 16px;
  border: none;
  padding: 3px;
  border-collapse: collapse;
  font-family: "Bitter", serif;
  background-color: rgb(15, 174, 241);
  border-radius: 5px;
  margin-bottom: 80px;
`;

const TH = styled.th`
  border: none;
  font-size: 18px;
`;

const THead = styled.thead`
  height: 100px;
`;
