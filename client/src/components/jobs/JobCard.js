import React from "react";
import { connect } from "react-redux";
import { currentJob } from "../../redux/actions/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";
import { Link } from "react-router-dom";
import { Span } from "../resusable-components/styledComponents";
import styled from "styled-components";
import Moment from "react-moment";

const JobCard = ({
  _id,
  company,
  status,
  currentJob,
  getEmployeesThunk,
  date
}) => {
  return (
    <>
      <Card>
        <Span>
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
        </Span>
        <Span>
          <StatusContainer>
            <P>Status:</P>
            <P>{status}</P>
          </StatusContainer>
        </Span>
        <Span>
          <Moment fromNow date={date} />
        </Span>
      </Card>
    </>
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

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const P = styled.p`
  font-size: 15px;
  padding: 3px 0;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  height: 180px;
  margin: 10px;
`;
