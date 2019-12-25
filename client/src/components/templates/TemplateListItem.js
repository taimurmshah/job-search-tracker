import React from "react";
import styled from "styled-components";
import { FormButton } from "../resusable-components/styledComponents";

const TemplateListItem = ({ template, text, clickHandler, id }) => {
  console.log("template list item is mounted");

  return (
    <TemplateContainer>
      <Span>
        <p>{template.name}</p>
      </Span>
      <Span>
        <FormButton onClick={clickHandler ? () => clickHandler(id) : null}>
          {text}
        </FormButton>
      </Span>
    </TemplateContainer>
  );
};

export default TemplateListItem;

const TemplateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Span = styled.span`
  padding: 10px;
  margin: 0 5px;
`;
