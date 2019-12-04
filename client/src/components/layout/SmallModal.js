import React from "react";
import styled from "styled-components";

const SmallModal = ({ closeModal, show, component }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <SmallModalMain>
        <div className="dialog">
          <a onClick={closeModal} className="close-thick" />
        </div>
        {component}
      </SmallModalMain>
    </div>
  );
};

export default SmallModal;

const SmallModalMain = styled.section`
  position: fixed;
  background: #fff;
  width: 300px;
  height: 200px;
  top: 50%;
  left: 50%;
  padding-top: 35px;
  transform: translate(-50%, -50%);
  border: 2px solid rgb(26, 31, 33);
`;
