import React from "react";
import styled from "styled-components";
import { HeaderContainer } from "../../resusableComponents/styledComponents";

const EmployeeElem = ({
  employee: { _id, name, response, emailsSent },
  selectedEmployees,
  setSelectedEmployees,
}) => {
  const CheckBox = styled.input.attrs({ type: "checkbox" })``;

  const checked = selectedEmployees.includes(_id);

  const toggleEmployee = (e) => {
    const employeeId = e.currentTarget.dataset.id;
    if (e.currentTarget.checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      const removed = selectedEmployees.filter((e) => e !== _id);
      setSelectedEmployees(removed);
    }
  };

  return (
    <>
      <TR>
        <TD>
          <HeaderContainer>
            <CheckBox
              data-id={_id}
              defaultChecked={checked}
              onClick={(e) => toggleEmployee(e)}
            />
          </HeaderContainer>
        </TD>

        <TD>
          <HeaderContainer>{name}</HeaderContainer>
        </TD>

        <TD>
          <HeaderContainer>{response ? "✅" : "🚨"}</HeaderContainer>
        </TD>

        <TD>
          <HeaderContainer>{emailsSent.length}</HeaderContainer>
        </TD>
      </TR>
    </>
  );
};

const TR = styled.tr`
  :nth-of-type(odd) {
    background-color: #e7e5e5;
  }
  :nth-of-type(even) {
    background-color: #fff;
  }
`;

const TD = styled.td`
  border: none;
`;

export default EmployeeElem;
