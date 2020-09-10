import React from "react";
import {
  ButtonsFlexbox,
  TableButton
} from "../../resusable-components/styledComponents";
import styled from "styled-components";

const ButtonsBelowTable = ({ setDeleteModal }) => {
  return (
    <ButtonsFlexbox>
      <DeleteButton onClick={() => setDeleteModal(true)}>
        Delete Job?
      </DeleteButton>
    </ButtonsFlexbox>
  );
};

const DeleteButton = styled(TableButton)`
  background-color: red;
  :hover {
    box-shadow: 0;
    background-color: #edadad;
  }
`;

export default ButtonsBelowTable;
