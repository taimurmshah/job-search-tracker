import React from "react";
import { connect } from "react-redux";
import { currentJob } from "../../redux/actions/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";
import { Link } from "react-router-dom";
import { Span } from "../resusable-components/styledComponents";
import styled from "styled-components";

const JobCard = ({ _id, company, status, currentJob, getEmployeesThunk }) => {
  return (
    <Span>
      <Card>
        <Link
          className="nav-link"
          onClick={() => {
            currentJob(_id);
            getEmployeesThunk(_id);
          }}
          to={`/jobs/${_id}`}
        >
          {company}
        </Link>
        <P>Status: {status}</P>
      </Card>
    </Span>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    currentJob: job => dispatch(currentJob(job)),
    getEmployeesThunk: jobId => dispatch(getEmployeesThunk(jobId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(JobCard);

const P = styled.p`
  margin-top: 10px;
  font-size: 15px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  height: 50px;
  padding: 10px;
`;
