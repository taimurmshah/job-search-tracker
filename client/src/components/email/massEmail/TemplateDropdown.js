import React, { useState } from "react";
import { connect } from "react-redux";
import DropdownOption from "./DropdownOption";
import styled from "styled-components";
import {
  HeaderContainer,
  TableButton
} from "../../resusableComponents/styledComponents";

const TemplateDropdown = ({ templates }) => {
  const [show, setShow] = useState(false);
  const [chosenTemplate, setChosenTemplate] = useState("Select Template");

  const DropdownContent = styled.div`
    display: ${show ? "show" : "none"};
    position: absolute;
    background-color: #f1f1f1;
    width: 15vw;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  `;

  templates = templates.map((t, i) => (
    <DropdownOption key={t._id} idx={i} _id={t._id} name={t.name} />
  ));

  return (
    <HeaderContainer>
      <Dropdown>
        <DropBtn onClick={() => setShow(!show)}>{chosenTemplate}</DropBtn>
        <DropdownContent>{templates}</DropdownContent>
      </Dropdown>
    </HeaderContainer>
  );
};

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropBtn = styled(TableButton)`
  width: 15vw;
  background-color: #3498db;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  :hover,
  :focus {
    background-color: #2980b9;
  }
`;

const mapStateToProps = state => ({ templates: state.template.templates });

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateDropdown);
