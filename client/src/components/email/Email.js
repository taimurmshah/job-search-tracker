import React, { useState } from "react";
import EmailNavbar from "./EmailNavbar";
import SendEmail from "./SendEmail";
import EmailModalTemplateList from "../templates/EmailModalTemplateList";

const Email = ({ sendEmailSubmitHandler, closeModal }) => {
  const [template, setTemplate] = useState(false);
  const [newEmail, setNewEmail] = useState(false);

  const selectTemplate = () => {
    setTemplate(true);
    setNewEmail(false);
  };

  const selectNewEmail = () => {
    setTemplate(false);
    setNewEmail(true);
  };

  return (
    <div>
      <EmailNavbar template={selectTemplate} newEmail={selectNewEmail} />

      {newEmail && (
        <SendEmail sendEmailSubmitHandler={sendEmailSubmitHandler} />
      )}

      {template && <EmailModalTemplateList closeModal={closeModal} />}
    </div>
  );
};

export default Email;
