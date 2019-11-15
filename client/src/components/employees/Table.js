import React, { Component } from "react";
import { connect } from "react-redux";
import { updateEmployeeThunk } from "../../redux/thunks/employee";
import Employee from "./Employee";

class Table extends Component {
  render() {
    const tableData = this.props.employees.map(e => {
      return (
        <Employee
          key={e._id}
          employee={e}
          emailButtonClickHandler={this.props.emailButtonClickHandler}
        />
      );
    });

    return (
      <div>
        <h1>Table</h1>
        <table id="employees">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>LinkedIn</th>
              <th>Response</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     employees: state.employee.employees
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    updateEmployeeThunk: (jobId, employeeId, updates) =>
      dispatch(updateEmployeeThunk(jobId, employeeId, updates))
  };
};

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(Table);
