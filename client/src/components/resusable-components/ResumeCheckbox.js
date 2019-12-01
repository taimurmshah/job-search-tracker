import React from "react";
import styled from "styled-components";

const ResumeCheckbox = ({ clickHandler }) => {
  return (
    <CheckBoxSpan>
      <p>Attach resume?</p>
      <Checkbox onClick={clickHandler} />
    </CheckBoxSpan>
  );
};

export default ResumeCheckbox;
const CheckBoxSpan = styled.span`
  display: flex;
  flex-direction: row;
  margin: 15px;
  justify-content: center;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-left: 5px;
`;
