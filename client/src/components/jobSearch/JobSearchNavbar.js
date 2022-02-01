import React from "react";
import { Span, ModalNav } from "../resusableComponents/styledComponents";

const JobSearchNavbar = ({ create, view }) => {
  return (
    <ModalNav>
      <Span>
        <p className="nav-link" onClick={create}>
          Start New Job Search
        </p>
      </Span>
      <Span>
        <p className="nav-link">Update Current Job Search</p>
      </Span>
      <Span>
        <p className="nav-link" onClick={view}>
          View Past Job Searches
        </p>
      </Span>
    </ModalNav>
  );
};

export default JobSearchNavbar;
