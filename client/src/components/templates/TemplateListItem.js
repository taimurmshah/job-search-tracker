import React from "react";
import { connect } from "react-redux";
import { selectTemplate } from "../../redux/actions/template";
import styled from "styled-components";
import { FormButton } from "../resusable-components/styledComponents";

const TemplateListItem = ({
  template,
  update,
  select,
  updateClickHandler,
  selectClickHandler,
  id,
  selectTemplate
}) => {
  console.log("template list item is mounted");

  const updateHandler = () => {
    selectTemplate(id);
    updateClickHandler();
  };

  return (
    <TemplateContainer>
      <Span>
        <p>{template.name}</p>
      </Span>
      <Span>
        {update && (
          <Span>
            <FormButton onClick={updateHandler}>View/Update</FormButton>
          </Span>
        )}
        {select && (
          <Span>
            <FormButton
              onClick={selectClickHandler ? () => selectClickHandler(id) : null}
            >
              Select
            </FormButton>
          </Span>
        )}
      </Span>
    </TemplateContainer>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    selectTemplate: templateId => dispatch(selectTemplate(templateId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TemplateListItem);

const TemplateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Span = styled.span`
  padding: 10px;
  margin: 0 5px;
`;
