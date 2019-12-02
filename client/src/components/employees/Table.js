import React, { Component } from "react";
import { connect } from "react-redux";
import { updateEmployeeThunk } from "../../redux/thunks/employee";
import Employee from "./Employee";
import Loading from "../layout/Loading";
import { HeaderContainer } from "../resusable-components/styledComponents";

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
        />
      );
    });

    return (
      <div className="employees-table">
        <HeaderContainer>
          <h2>Employees</h2>
        </HeaderContainer>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>LinkedIn</th>
              <th>Response</th>
              <th>Email</th>
              <th>Emails Sent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
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
