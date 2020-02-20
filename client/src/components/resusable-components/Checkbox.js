import React from "react";
import styled from "styled-components";

const Checkbox = ({ clickHandler, text, checked }) => {
  return (
    <CheckBoxSpan>
      <P>{text}</P>
      <CheckboxInput defaultChecked={checked} onClick={clickHandler} />
    </CheckBoxSpan>
  );
};

export default Checkbox;
const CheckBoxSpan = styled.span`
  display: flex;
  flex-direction: row;
  margin: 5px;
  justify-content: flex-end;
`;

const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  margin-left: 5px;
`;

const P = styled.p`
  font-size: 13px;
`;
