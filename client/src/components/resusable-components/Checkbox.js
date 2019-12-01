import React from "react";
import styled from "styled-components";

const Checkbox = ({ clickHandler, text }) => {
  return (
    <CheckBoxSpan>
      <p>{text}</p>
      <CheckboxInput onClick={clickHandler} />
    </CheckBoxSpan>
  );
};

export default Checkbox;
const CheckBoxSpan = styled.span`
  display: flex;
  flex-direction: row;
  margin: 15px;
  justify-content: center;
`;

const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  margin-left: 5px;
`;
