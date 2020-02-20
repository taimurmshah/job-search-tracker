import React from "react";
import { connect } from "react-redux";
import { currentJob } from "../../redux/actions/job";
import { getEmployeesThunk } from "../../redux/thunks/employee";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();

  return (
    <>
      <Card
        onClick={() => {
          history.push(`/jobs/${_id}`);
        }}
      >
        <Header>
          <Span>
            <Link
              className="nav-link-white"
              onClick={() => {
                currentJob(_id);
                getEmployeesThunk(_id);
              }}
              to={`/jobs/${_id}`}
            >
              {company}
            </Link>
          </Span>
        </Header>
        <Body>
          <Span>
            <StatusContainer>
              <P>Status:</P>
              <P>{status}</P>
            </StatusContainer>
          </Span>

          <DaysContainer>
            <Span>
              <Moment fromNow date={date} />
            </Span>
          </DaysContainer>
        </Body>
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

const Card = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 180px;
  margin: 5px;
  cursor: pointer;
`;

const Header = styled.div`
  width: 100%;
  background: #3a3b41;
  height: 31px;
  padding-top: 14px;
  border-bottom: 5px solid #c8df96;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
`;

const Body = styled.div`
  display: grid;
  grid-template-rows: 100px 10px 20px;
  width: 100%;
  background: #f3f3f3;
  height: 150px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DaysContainer = styled.div`
  grid-row: 3/4;
`;

const P = styled.p`
  font-size: 14px;
  padding: 3px 0;
`;
