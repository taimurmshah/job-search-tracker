import React from "react";
import { connect } from "react-redux";
import {
  employeeDataModal,
  massEmailModal
} from "../../../redux/actions/modal";
import {
  TableButton,
  Span,
  ButtonsFlexbox
} from "../../resusableComponents/styledComponents";

const ButtonsAboveTable = ({
  employees,
  employeeDataModal,
  massEmailModal
}) => {
  return (
    <ButtonsFlexbox>
      <TableButton onClick={employeeDataModal}>Add Employee</TableButton>{" "}
      <Span />
      {employees.length > 0 && (
        <TableButton onClick={massEmailModal}>Mass Email</TableButton>
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
    employeeDataModal: () => dispatch(employeeDataModal()),
    massEmailModal: () => dispatch(massEmailModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonsAboveTable);
