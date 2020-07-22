import React from "react";
import styled from "styled-components";

const Modal = ({ closeModal, show, component }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <ModalMain>
        <div className="dialog">
          <button onClick={closeModal} className="close-thick" />
        </div>
        {component}
      </ModalMain>
    </div>
  );
};

export default Modal;

const ModalMain = styled.section`
  position: fixed;
  background: #fff;
  width: 800px;
  height: 650px;
  top: 50%;
  left: 50%;
  padding-top: 35px;
  transform: translate(-50%, -50%);
  border: 2px solid rgb(26, 31, 33);
`;
