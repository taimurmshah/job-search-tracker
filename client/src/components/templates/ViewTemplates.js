import React from "react";
import { connect } from "react-redux";
import TemplateListItem from "./TemplateListItem";
import { HeaderContainer } from "../resusableComponents/styledComponents";
import styled from "styled-components";

const ViewTemplates = ({ templates, update }) => {
  const allTemplates = templates.map((t) => {
    return (
      <TemplateListItem
        update={true}
        id={t._id}
        key={t._id}
        template={t}
        updateClickHandler={update}
      />
    );
  });

  return (
    <HeaderContainer>
      <TemplateListContainer>
        {templates.length === 0 && <h3>You don't have any templates!</h3>}

        {allTemplates}
      </TemplateListContainer>
    </HeaderContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    templates: state.template.templates,
  };
};

export default connect(mapStateToProps)(ViewTemplates);

const TemplateListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 38vw;
  height: 58vh;
  overflow: scroll;
`;
