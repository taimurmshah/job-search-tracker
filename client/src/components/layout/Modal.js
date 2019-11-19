import React from "react";
import styled from "styled-components";

const Modal = ({ closeModal, show, component }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <ModalMain>
        <div className="dialog">
          <a onClick={closeModal} className="close-thick" />
        </div>
        {component}
        {/*<button onClick={closeModal}>Close</button>*/}
      </ModalMain>
    </div>
  );
};

export default Modal;

const ModalMain = styled.section`
  position: fixed;
  background: #70d4ba;
  width: 600px;
  height: 500px;
  top: 50%;
  left: 50%;
  padding-top: 35px;
  transform: translate(-50%, -50%);
  border: 1px solid black;
`;
