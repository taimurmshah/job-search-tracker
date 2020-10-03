import React from "react";
import { connect } from "react-redux";
import TemplateListItem from "./TemplateListItem";
import { sendTemplateGmailThunk } from "../../redux/thunks/email";
import { readAllTemplatesThunk } from "../../redux/thunks/template";
import { HeaderContainer } from "../resusableComponents/styledComponents";
import styled from "styled-components";

const EmailModalTemplateList = ({
  templates,
  employeeId,
  sendTemplateGmailThunk,
  closeModal
}) => {
  if (templates.length === 0) {
    return <p>You don't have any templates</p>;
  }

  const templateEmailHandler = templateId => {
    sendTemplateGmailThunk(employeeId, templateId);
    closeModal();
  };

  const allTemplates = templates.map(t => {
    return (
      <TemplateListItem
        id={t._id}
        key={t._id}
        template={t}
        select={true}
        selectClickHandler={templateEmailHandler}
      />
    );
  });
  return (
    <HeaderContainer>
      <ListContainer>{allTemplates}</ListContainer>
    </HeaderContainer>
  );
};

const mapStateToProps = state => {
  return {
    templates: state.template.templates,
    employeeId: state.employee.currentEmployee._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendTemplateGmailThunk: (employeeId, templateId) =>
      dispatch(sendTemplateGmailThunk(employeeId, templateId)),
    readAllTemplatesThunk: () => dispatch(readAllTemplatesThunk())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailModalTemplateList);

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 38vw;
  height: 58vh;
  overflow: scroll;
`;
