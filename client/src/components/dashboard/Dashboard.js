import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { readJobsThunk, progressThunk } from "../../redux/thunks/job";
import Loading from "../layout/Loading";
import Modal from "../layout/Modal";
import DashboardLinks from "./DashboardLinks";
import Resume from "../resume/Resume";
import Templates from "../templates/Templates";
import { HeaderContainer } from "../resusableComponents/styledComponents";
import { readAllTemplatesThunk } from "../../redux/thunks/template";
import { clearTemplate } from "../../redux/actions/template";
import BarChart2 from "./BarChart2";

const Dashboard = ({
  isLoggedIn,
  hasJobs,
  readJobsThunk,
  readAllTemplatesThunk,
  clearTemplate,
  progressThunk,
}) => {
  useEffect(() => {
    if (!hasJobs) readJobsThunk();
    progressThunk();
  });

  const [template, setTemplate] = useState(false);
  const [resume, setResume] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    clearTemplate();
    setShowModal(false);
    setTemplate(false);
    setResume(false);
  };

  const openResume = () => {
    setResume(true);
    setShowModal(true);
  };

  const openTemplates = () => {
    readAllTemplatesThunk();
    setTemplate(true);
    setShowModal(true);
  };

  if (!isLoggedIn) return <Loading />;
  if (!localStorage.getItem("token")) return <Redirect to="/" />;

  return (
    <div>
      <HeaderContainer>
        <h1>Dashboard</h1>
      </HeaderContainer>
      <DashboardLinks openResume={openResume} openTemplates={openTemplates} />
      <Modal />
      <BarChart2 />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    hasJobs: state.job.hasJobs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readJobsThunk: () => dispatch(readJobsThunk()),
    readAllTemplatesThunk: () => dispatch(readAllTemplatesThunk()),
    clearTemplate: () => dispatch(clearTemplate()),
    progressThunk: () => dispatch(progressThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
