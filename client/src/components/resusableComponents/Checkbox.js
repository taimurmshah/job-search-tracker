import React from "react";
import styled from "styled-components";

const Checkbox = ({ clickHandler, text, checked, show, position }) => {
  const CheckBoxSpan = styled.span`
    display: flex;
    flex-direction: row;
    margin: 5px;
    justify-content: ${position};
  `;

  const Span = styled.span`
    margin: 5px;
  `;
  const P = styled.p`
    font-size: ${position === "flex-start" ? "16px" : "13px"};
  `;

  const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
    margin-left: 5px;
    ${show === false && "pointer-events: none"};
  `;

  return (
    <CheckBoxSpan>
      {position === "flex-start" ? (
        <>
          <CheckboxInput
            defaultChecked={checked}
            onClick={() => {
              console.log({ clickHandler });

              clickHandler();
            }}
          />
          <Span />
          <P>{text}</P>
        </>
      ) : (
        <>
          <P>{text}</P>
          <CheckboxInput
            defaultChecked={checked}
            onClick={() => {
              console.log({ clickHandler });

              clickHandler();
            }}
          />
        </>
      )}
    </CheckBoxSpan>
  );
};

export default Checkbox;
