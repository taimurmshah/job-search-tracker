import React from "react";
import { Span, ModalNav } from "../styled-components/styledComponents";

const EmailNavbar = ({ template, newEmail }) => {
  return (
    <ModalNav>
      <Span>
        <p className="nav-link" onClick={template}>
          Use Email Template
        </p>
      </Span>
      <Span>
        <p className="nav-link" onClick={newEmail}>
          Compose New Email
        </p>
      </Span>
    </ModalNav>
  );
};

export default EmailNavbar;
