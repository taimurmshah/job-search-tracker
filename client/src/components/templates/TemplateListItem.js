import React from "react";
import { connect } from "react-redux";
import { selectTemplate } from "../../redux/actions/template";
import styled from "styled-components";
import {
  FormButton,
  TableButton
} from "../resusable-components/styledComponents";

const TemplateListItem = ({
  template,
  update,
  select,
  updateClickHandler,
  selectClickHandler,
  id,
  selectTemplate
}) => {
  const updateHandler = () => {
    selectTemplate(id);
    updateClickHandler();
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
            <TableButton
              onClick={selectClickHandler ? () => selectClickHandler(id) : null}
            >
              Select
            </TableButton>
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
