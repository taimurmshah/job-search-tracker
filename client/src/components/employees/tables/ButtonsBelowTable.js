import React from "react";
import { connect } from "react-redux";
import { deleteJobModal } from "../../../redux/actions/modal";
import {
  ButtonsFlexbox,
  DeleteButton,
} from "../../resusableComponents/styledComponents";

const ButtonsBelowTable = ({ deleteJobModal }) => {
  return (
    <ButtonsFlexbox>
      <DeleteButton onClick={deleteJobModal}>Delete Job?</DeleteButton>
    </ButtonsFlexbox>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteJobModal: () => dispatch(deleteJobModal()),
  };
};

export default connect(null, mapDispatchToProps)(ButtonsBelowTable);
