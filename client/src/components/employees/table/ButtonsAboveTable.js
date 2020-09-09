import React from "react";
import styled from "styled-components";
import { TableButton, Span } from "../../resusable-components/styledComponents";

const ButtonsAboveTable = ({ createNewEmployee }) => {
  return (
    <ButtonsFlexbox>
      <TableButton onClick={createNewEmployee}>Add Employee</TableButton>{" "}
      <Span />
      <TableButton onClick={() => console.log("hitting mass email button")}>
        Mass Email
      </TableButton>
    </ButtonsFlexbox>
  );
};

const ButtonsFlexbox = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export default ButtonsAboveTable;
