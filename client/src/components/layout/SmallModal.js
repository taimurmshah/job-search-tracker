import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions/modal";
import DeleteEmployee from "../employees/DeleteEmployee";

import styled from "styled-components";

const SmallModal = ({ modal, closeModal }) => {
  const showHideClassName = modal.isSmallModalOpen
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <SmallModalMain>
        <div className="dialog">
          <button onClick={closeModal} className="close-thick" />
        </div>
        {modal.deleteEmployee && <DeleteEmployee />}
      </SmallModalMain>
    </div>
  );
};

const mapStateToProps = state => ({ modal: state.modal });

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmallModal);

const SmallModalMain = styled.section`
  position: fixed;
  background: #fff;
  width: 500px;
  height: 400px;
  top: 50%;
  left: 50%;
  padding-top: 35px;
  transform: translate(-50%, -50%);
  border: 2px solid rgb(26, 31, 33);
`;
