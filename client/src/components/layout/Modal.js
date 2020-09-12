import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../redux/actions/modal";
import JobDataForm from "../job/JobDataForm";
import Progress from "../job/Progress";
import Notes from "../job/Notes";
import EmployeeDataForm from "../employees/EmployeeDataForm";
import AddEmail from "../email/AddEmail";
import EmailContainer from "../email/EmailContainer";

import styled from "styled-components";

const Modal = ({ modal, closeModal }) => {
  const showHideClassName = modal.isBigModalOpen
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <ModalMain>
        <div className="dialog">
          <button onClick={closeModal} className="close-thick" />
        </div>

        {modal.jobData && <JobDataForm />}

        {modal.jobProgress && <Progress />}

        {modal.jobNotes && <Notes />}

        {modal.employeeData && <EmployeeDataForm />}

        {modal.addEmail && <AddEmail />}

        {modal.emailContainer && <EmailContainer />}
      </ModalMain>
    </div>
  );
};

const mapStateToProps = state => ({ modal: state.modal });

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

const ModalMain = styled.section`
  position: fixed;
  background: linear-gradient(
      102deg,
      rgba(254, 254, 254, 0.03) 0%,
      rgba(254, 254, 254, 0.03) 22%,
      rgba(9, 9, 9, 0.03) 22%,
      rgba(9, 9, 9, 0.03) 40%,
      rgba(109, 109, 109, 0.03) 40%,
      rgba(109, 109, 109, 0.03) 47%,
      rgba(121, 121, 121, 0.03) 47%,
      rgba(121, 121, 121, 0.03) 89%,
      rgba(8, 8, 8, 0.03) 89%,
      rgba(8, 8, 8, 0.03) 100%
    ),
    linear-gradient(
      165deg,
      rgba(203, 203, 203, 0.03) 0%,
      rgba(203, 203, 203, 0.03) 42%,
      rgba(148, 148, 148, 0.03) 42%,
      rgba(148, 148, 148, 0.03) 43%,
      rgba(173, 173, 173, 0.03) 43%,
      rgba(173, 173, 173, 0.03) 56%,
      rgba(226, 226, 226, 0.03) 56%,
      rgba(226, 226, 226, 0.03) 66%,
      rgba(37, 37, 37, 0.03) 66%,
      rgba(37, 37, 37, 0.03) 100%
    ),
    linear-gradient(
      240deg,
      rgba(99, 99, 99, 0.03) 0%,
      rgba(99, 99, 99, 0.03) 57%,
      rgba(92, 92, 92, 0.03) 57%,
      rgba(92, 92, 92, 0.03) 59%,
      rgba(94, 94, 94, 0.03) 59%,
      rgba(94, 94, 94, 0.03) 72%,
      rgba(23, 23, 23, 0.03) 72%,
      rgba(23, 23, 23, 0.03) 81%,
      rgba(234, 234, 234, 0.03) 81%,
      rgba(234, 234, 234, 0.03) 100%
    ),
    linear-gradient(
      71deg,
      rgba(81, 81, 81, 0.03) 0%,
      rgba(81, 81, 81, 0.03) 30%,
      rgba(102, 102, 102, 0.03) 30%,
      rgba(102, 102, 102, 0.03) 74%,
      rgba(10, 10, 10, 0.03) 74%,
      rgba(10, 10, 10, 0.03) 84%,
      rgba(200, 200, 200, 0.03) 84%,
      rgba(200, 200, 200, 0.03) 88%,
      rgba(103, 103, 103, 0.03) 88%,
      rgba(103, 103, 103, 0.03) 100%
    ),
    linear-gradient(90deg, rgb(215, 215, 215), rgb(203, 203, 203));

  // width: 800px;
  // height: 650px;
  width: 45vw;
  height: 70vh;
  top: 50%;
  left: 50%;
  padding-top: 35px;
  transform: translate(-50%, -50%);
  border: 2px solid rgb(26, 31, 33);
`;
