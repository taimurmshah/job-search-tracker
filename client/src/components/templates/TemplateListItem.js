import React from "react";
import styled from "styled-components";

const TemplateListItem = ({ template }) => {
  console.log("template list item is mounted");
  return (
    <TemplateContainer>
      <Span>
        <p>Name: {template.name}</p>
      </Span>
      <Span>
        <p>Subject: {template.subject}</p>
      </Span>
      <Span>
        <p>Resume? {template.withResume ? "👍🏽" : "👎🏽"}</p>
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
