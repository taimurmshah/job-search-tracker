import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Menu } from "../resusable-components/styledComponents";

const DashboardLinks = ({ openResume, openTemplates }) => {
  return (
    <Menu>
      <Span>
        <Link className="nav-link" to="/jobs">
          Jobs
        </Link>
      </Span>
      <Span>
        <p className="nav-link" onClick={openResume}>
          Resume
        </p>
      </Span>
      <Span>
        <p className="nav-link" onClick={openTemplates}>
          Templates
        </p>
      </Span>
    </Menu>
  );
};

const mapStateToProps = state => {
  return {
    resume: state.auth.currentUser.resume,
    hasJobs: state.job.hasJobs
  };
};

export default connect(mapStateToProps)(DashboardLinks);

const Span = styled.span`
  padding: 10px;
  margin: 5px;
`;
