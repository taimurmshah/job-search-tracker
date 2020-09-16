import React, { useState } from "react";
import { connect } from "react-redux";
import TemplateDropdown from "./TemplateDropdown";
import EmployeeTable from "./EmployeeTable";
import { sendTemplateGmailThunk } from "../../../redux/thunks/email";
import { closeModal } from "../../../redux/actions/modal";
import styled from "styled-components";
import {
  HeaderContainer,
  TableButton
} from "../../resusableComponents/styledComponents";

const MassEmail = ({ sendTemplateGmailThunk, closeModal }) => {
  const [templateId, setTemplateId] = useState("");
  const [employees, setEmployees] = useState([]);

  console.log({ templateId });

  const submit = async () => {
    if (employees.length === 0) {
      console.log("NO CAN DO");
      return closeModal();
    }
    let queue = [...employees];

    try {
      while (queue.length > 0) {
        const emp = queue.pop();
        const res = await sendTemplateGmailThunk(emp._id, templateId);
        console.log({ res });
      }
    } catch (err) {}
    return closeModal();
  };

  return (
    <Grid>
      <TemplateDropdown setTemplateId={setTemplateId} />
      <EmployeeTable setEmployees={setEmployees} />
      <HeaderContainer>
        <span>
          <TableButton onClick={submit}>Send</TableButton>
        </span>
      </HeaderContainer>
    </Grid>
  );
};

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
`;

const mapDispatchToProps = dispatch => {
  return {
    sendTemplateGmailThunk: (employeeId, templateId) =>
      dispatch(sendTemplateGmailThunk(employeeId, templateId)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MassEmail);
