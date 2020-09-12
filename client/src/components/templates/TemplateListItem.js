import React from "react";
import { connect } from "react-redux";
import { selectTemplate } from "../../redux/actions/template";
import styled from "styled-components";
import {
  FormButton,
  TableButton
} from "../resusableComponents/styledComponents";
import { removeCurrentEmployee } from "../../redux/actions/employee";
import { closeModal } from "../../redux/actions/modal";
import { sendTemplateGmailThunk } from "../../redux/thunks/email";

const TemplateListItem = ({
  template,
  id,
  employeeId,
  update,
  select,
  updateClickHandler,
  sendTemplateGmailThunk,

  selectTemplate,
  closeModal
}) => {
  const updateHandler = () => {
    selectTemplate(id);
    updateClickHandler();
  };

  const sendEmail = () => {
    sendTemplateGmailThunk(employeeId, id);
    closeModal();
  };

  return (
    <TemplateContainer>
      <TitleSpan>
        <p>{template.name}</p>
      </TitleSpan>
      <Span>
        {update && (
          <Span>
            <TableButton onClick={updateHandler}>View/Update</TableButton>
          </Span>
        )}
        {select && (
          <Span>
            <TableButton onClick={sendEmail}>Select</TableButton>
          </Span>
        )}
      </Span>
    </TemplateContainer>
  );
};

const mapStateToProps = state => ({
  employeeId: state.employee.currentEmployee._id
});

const mapDispatchToProps = dispatch => {
  return {
    sendTemplateGmailThunk: (employeeId, templateId) =>
      dispatch(sendTemplateGmailThunk(employeeId, templateId)),
    selectTemplate: templateId => dispatch(selectTemplate(templateId)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateListItem);

const TemplateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  :nth-of-type(odd) {
    background-color: #e7e5e5;
  }
  :nth-of-type(even) {
    background-color: #fff;
  }
`;

const Span = styled.span`
  padding: 10px;
  margin: 0 5px;
`;

const TitleSpan = styled.span`
  padding: 10px;
  margin: 1vh 5px;
`;
