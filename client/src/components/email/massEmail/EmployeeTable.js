import React from "react";
import { connect } from "react-redux";
import EmployeeElem from "./EmployeeElem";
import Checkbox from "../../resusableComponents/Checkbox";
import styled from "styled-components";

const EmployeeTable = ({ employees }) => {
  employees = employees.map(e => <EmployeeElem key={e._id} employee={e} />);

  return (
    <Div>
      <StyledTable>
        <THead>
          <tr>
            <TH>
              <Checkbox />
            </TH>
            <TH>Name</TH>
            <TH>Response</TH>
            <TH>EmailsSent</TH>
          </tr>
        </THead>
        <tbody>{employees}</tbody>
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
