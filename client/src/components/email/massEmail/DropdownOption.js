import React from "react";
import styled from "styled-components";

const DropdownOption = ({ _id, name, select }) => {
  return <DropElem onClick={() => select(_id, name)}>{name}</DropElem>;
};

const DropElem = styled.p`
  color: black;
  padding: 12px 16px;
  display: block;
  cursor: pointer;
  :nth-of-type(odd) {
    background-color: #e7e5e5;
  }
  :nth-of-type(even) {
    background-color: #fff;
  }
  :hover {
    color: blue;
  }
`;

export default DropdownOption;
