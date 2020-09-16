import React from "react";
import Checkbox from "../../resusableComponents/Checkbox";
import styled from "styled-components";
import { HeaderContainer } from "../../resusableComponents/styledComponents";

const EmployeeElem = ({ employee: { _id, name, response, emailsSent } }) => {
  return (
    <>
      <TR data-id={_id}>
        <TD>
          <Checkbox />
        </TD>

        <TD>
          <HeaderContainer>{name} </HeaderContainer>
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
