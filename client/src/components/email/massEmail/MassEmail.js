import React from "react";
import TemplateDropdown from "./TemplateDropdown";
import EmployeeTable from "./EmployeeTable";
import styled from "styled-components";

const MassEmail = () => {
  return (
    <Grid>
      <TemplateDropdown />
      <EmployeeTable />
    </Grid>
  );
};

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
`;

export default MassEmail;
