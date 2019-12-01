import React from "react";
import { Span, ModalNav } from "../resusable-components/styledComponents";

const ResumeNavbar = ({ resume, upload, view, edit, deleteResume }) => {
  return (
    <ModalNav>
      {resume ? (
        <>
          <Span>
            <p className="nav-link" onClick={edit}>
              Edit Resume
            </p>
          </Span>
          <Span>
            <p className="nav-link" onClick={view}>
              View Resume
            </p>
          </Span>
          <Span>
            <p className="nav-link" onClick={deleteResume}>
              Delete Resume
            </p>
          </Span>
        </>
      ) : (
        <Span>
          <p className="nav-link" onClick={upload}>
            Upload Resume
          </p>
        </Span>
      )}
    </ModalNav>
  );
};

export default ResumeNavbar;
