import React from "react";

const Modal = ({ closeModal, show, component }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="dialog">
          <a href="#" onClick={closeModal} className="close-thick" />
        </div>
        {component}
        {/*<button onClick={closeModal}>Close</button>*/}
      </section>
    </div>
  );
};

export default Modal;
