import React from "react";
import { connect } from "react-redux";
import TemplateListItem from "./TemplateListItem";
import { sendTemplateGmailThunk } from "../../redux/thunks/email";

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
    console.log("template email handler is getting hit!");
    sendTemplateGmailThunk(employeeId, templateId);
    closeModal();
  };

  const allTemplates = templates.map(t => {
    return (
      <TemplateListItem
        id={t._id}
        key={t._id}
        template={t}
        text="Select"
        clickHandler={templateEmailHandler}
      />
    );
  });
  return <ListContainer>{allTemplates}</ListContainer>;
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
      dispatch(sendTemplateGmailThunk(employeeId, templateId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailModalTemplateList);

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
