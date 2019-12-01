import React from "react";
import { connect } from "react-redux";
import TemplateListItem from "./TemplateListItem";
import styled from "styled-components";

const ViewTemplates = ({ templates }) => {
  const allTemplates = templates.map(t => {
    return <TemplateListItem key={t._id} template={t} />;
  });

  console.log({ allTemplates });

  return (
    <TemplateListContainer>
      {templates.length === 0 && <h3>You don't have any templates!</h3>}

      {allTemplates}
    </TemplateListContainer>
  );
};

const mapStateToProps = state => {
  return {
    templates: state.template.templates
  };
};

export default connect(mapStateToProps)(ViewTemplates);

const TemplateListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
`;
