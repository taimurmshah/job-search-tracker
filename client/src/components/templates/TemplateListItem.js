import React from "react";
import styled from "styled-components";

const TemplateListItem = ({ template, text, clickHandler, id }) => {
  console.log("template list item is mounted");

  return (
    <TemplateContainer>
      <Span>
        <p>{template.name}</p>
      </Span>
      <Span>
        <button onClick={clickHandler ? () => clickHandler(id) : null}>
          {text}
        </button>
      </Span>
    </TemplateContainer>
  );
};

export default TemplateListItem;

const TemplateContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Span = styled.span`
  padding: 10px;
  margin: 0 5px;
`;
