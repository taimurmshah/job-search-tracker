import React from "react";

const Modal = ({ closeModal, show, component }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  console.log({ closeModal });
  console.log({ show });
  console.log({ component });
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {component}
        <button onClick={closeModal}>Close</button>
      </section>
    </div>
  );
};

export default Modal;
