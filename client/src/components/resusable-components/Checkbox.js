import React from "react";
import styled from "styled-components";

const Checkbox = ({ clickHandler, text, checked, show }) => {
  // console.log("show:", show);

  const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
    margin-left: 5px;
    ${!show && "pointer-events: none"};
  `;
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

const P = styled.p`
  font-size: 13px;
`;
