import React from "react";
import { connect } from "react-redux";
import { Span, HeaderContainer } from "../resusableComponents/styledComponents";
import styled from "styled-components";
import { closeSmallModal } from "../../redux/actions/modal";
import { clearTemplate } from "../../redux/actions/template";
import { deleteTemplateThunk } from "../../redux/thunks/template";

const DeleteTemplate = ({
  template,
  closeSmallModal,
  clearTemplate,
  deleteTemplateThunk,
}) => {
  const handleDelete = () => {
    console.log("DELETE TEMPLATE", { template });
    deleteTemplateThunk(template._id);

    clearTemplate();
    closeSmallModal();
  };

  return (
    <Container>
      <HeaderContainer>
        <p>Are you sure you want to delete "{template.name}?"</p>
      </HeaderContainer>
      <ButtonContainer>
        <Span>
          <button onClick={handleDelete}>Yes</button>
        </Span>
        <Span>
          <button onClick={closeSmallModal}>No</button>
        </Span>
      </ButtonContainer>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  template: state.template.selectedTemplate,
});

const mapDispatchToProps = (dispatch) => {
  return {
    closeSmallModal: () => dispatch(closeSmallModal()),
    clearTemplate: () => dispatch(clearTemplate()),
    deleteTemplateThunk: (templateId) =>
      dispatch(deleteTemplateThunk(templateId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTemplate);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
