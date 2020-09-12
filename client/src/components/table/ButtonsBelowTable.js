import React from "react";
import { connect } from "react-redux";
import { deleteJobModal } from "../../redux/actions/modal";
import {
  ButtonsFlexbox,
  TableButton
} from "../resusableComponents/styledComponents";
import styled from "styled-components";

const ButtonsBelowTable = ({ deleteJobModal }) => {
  return (
    <ButtonsFlexbox>
      <DeleteButton onClick={deleteJobModal}>Delete Job?</DeleteButton>
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

const mapDispatchToProps = dispatch => {
  return {
    deleteJobModal: () => dispatch(deleteJobModal())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ButtonsBelowTable);
