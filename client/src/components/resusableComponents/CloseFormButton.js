import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions/modal";

const CloseFormButton = ({ closeModal }) => {
  return (
    <button className="button" onClick={closeModal}>
      Close
    </button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(null, mapDispatchToProps)(CloseFormButton);
