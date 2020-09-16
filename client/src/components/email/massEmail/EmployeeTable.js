import React from "react";
import { connect } from "react-redux";
import EmployeeElem from "./EmployeeElem";
import styled from "styled-components";

const EmployeeTable = ({
  employees,
  selectedEmployees,
  setSelectedEmployees
}) => {
  const CheckBox = styled.input.attrs({ type: "checkbox" })``;

  const checked = selectedEmployees.length === employees.length;

  const toggleSelectAll = () => {
    if (!checked) {
      const employeesToAdd = [...selectedEmployees];
      employees.forEach(e => {
        if (!employeesToAdd.includes(e._id)) employeesToAdd.push(e._id);
      });

      setSelectedEmployees(employeesToAdd);
    } else setSelectedEmployees([]);
  };

  const employeeElems = employees.map(e => (
    <EmployeeElem
      key={e._id}
      employee={e}
      selectedEmployees={selectedEmployees}
      setSelectedEmployees={setSelectedEmployees}
    />
  ));

  return (
    <Div>
      <StyledTable>
        <THead>
          <tr>
            <TH>
              <CheckBox defaultChecked={checked} onClick={toggleSelectAll} />
            </TH>
            <TH>Name</TH>
            <TH>Response</TH>
            <TH>EmailsSent</TH>
          </tr>
        </THead>
        <tbody>{employeeElems}</tbody>
      </StyledTable>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  width: 100%
  flex-direction: row;
  justify-content: center;
`;

const StyledTable = styled.table`
  width: 600px;
  font-size: 16px;
  border: none;
  padding: 3px;
  border-collapse: collapse;
  font-family: "Bitter", serif;
  background-color: rgb(15, 174, 241);
  border-radius: 5px;
  margin-bottom: 40px;
`;

const TH = styled.th`
  border: none;
  font-size: 18px;
`;

const THead = styled.thead`
  height: 100px;
`;

const mapStateToProps = state => ({
  employees: state.employee.employees
});

export default connect(mapStateToProps)(EmployeeTable);
