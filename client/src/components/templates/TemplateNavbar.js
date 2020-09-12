import React from "react";
import { Span, ModalNav } from "../resusableComponents/styledComponents";

const TemplateNavbar = ({ view, create }) => {
  return (
    <ModalNav>
      <Span>
        <p className="nav-link" onClick={create}>
          New Template
        </p>
      </Span>
      <Span>
        <p className="nav-link" onClick={view}>
          View Templates
        </p>
      </Span>
    </ModalNav>
  );
};

export default TemplateNavbar;
