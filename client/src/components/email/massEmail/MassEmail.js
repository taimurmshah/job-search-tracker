import React, { useState } from "react";
import { connect } from "react-redux";
import TemplateDropdown from "./TemplateDropdown";
import EmployeeTable from "./EmployeeTable";
import Loading from "../../layout/Loading";
import { sendTemplateGmailThunk } from "../../../redux/thunks/email";
import { closeModal } from "../../../redux/actions/modal";
import styled from "styled-components";
import {
  HeaderContainer,
  TableButton
} from "../../resusableComponents/styledComponents";

//todo handle submit error; if email doesn't go through

const MassEmail = ({ sendTemplateGmailThunk, closeModal }) => {
  const [templateId, setTemplateId] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (templateId === "") return alert("PLEASE SELECT TEMPLATE");
    setLoading(true);
    for (let i = 0; i < selectedEmployees.length; i++) {
      const employeeId = selectedEmployees[i];
      const res = await sendTemplateGmailThunk(employeeId, templateId);

      if (res.result.accepted.length > 0)
        console.log(`${res.employee.name}: Success.`);
    }
    setLoading(false);
    return closeModal();
  };

  if (loading) return <Loading />;

  return (
    <Grid>
      <TemplateDropdown setTemplateId={setTemplateId} />
      <EmployeeTable
        setSelectedEmployees={setSelectedEmployees}
        selectedEmployees={selectedEmployees}
      />
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

const mapStateToProps = state => ({ employees: state.employee.employees });

const mapDispatchToProps = dispatch => {
  return {
    sendTemplateGmailThunk: (employeeId, templateId) =>
      dispatch(sendTemplateGmailThunk(employeeId, templateId)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MassEmail);
