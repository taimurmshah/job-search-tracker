import React from "react";
import { connect } from "react-redux";
import { employeeDataModal } from "../../../redux/actions/modal";
import {
  TableButton,
  Span,
  ButtonsFlexbox
} from "../../resusable-components/styledComponents";

const ButtonsAboveTable = ({ employees, employeeDataModal }) => {
  return (
    <ButtonsFlexbox>
      <TableButton onClick={employeeDataModal}>Add Employee</TableButton>{" "}
      <Span />
      {employees.length > 0 && (
        <TableButton onClick={() => console.log("hitting mass email button")}>
          Mass Email
        </TableButton>
      )}
    </ButtonsFlexbox>
  );
};

const mapStateToProps = state => {
  return {
    employees: state.employee.employees
  };
};

const mapDispatchToProps = dispatch => {
  return {
    employeeDataModal: () => dispatch(employeeDataModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonsAboveTable);
