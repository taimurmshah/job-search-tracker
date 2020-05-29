import React, { Component } from "react";
import Modal from "../layout/Modal";
import UpdateStatus from "./UpdateStatus";
import UpdateProgress from "./UpdateProgress";
import JobNotes from "./JobNotes";
import UpdateJob from "./UpdateJob";

import {
  HeaderContainer,
  Menu,
  Span
} from "../resusable-components/styledComponents";

class Job extends Component {
  state = {
    status: false,
    notes: false,
    progress: false,
    update: false
  };

  showUpdate = () => {
    this.setState({ update: true });
  };

  showProgress = () => {
    this.setState({
      progress: true
    });
  };

  showStatus = () => {
    this.setState({
      status: true
    });
  };

  showNotes = () => {
    this.setState({
      notes: true
    });
  };

  closeModal = () => {
    this.setState({
      status: false,
      notes: false,
      progress: false,
      update: false
    });
  };

  render() {
    let {
      _id,
      company,
      linkedIn,
      link,
      website,
      notes,
      // status,
      progress
    } = this.props.job;

    website = "https://" + website;
    // debugger;

    link = link && link.startsWith("http") ? link : "https://" + link;

    return (
      <div>
        <HeaderContainer>
          <h1>{company}</h1>
        </HeaderContainer>
        <Menu>
          <Span>
            <p className="nav-link" onClick={this.showUpdate}>
              Update
            </p>
          </Span>
          <Span>
            <a
              className="nav-link"
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Span>
          <Span>
            {/* todo standardize this on backend*/}
            <a
              className="nav-link"
              href={website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </Span>
          <Span>
            <a
              className="nav-link"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Job Description
            </a>
          </Span>
          <Span>
            <p className="nav-link" onClick={this.showStatus}>
              Update Status
            </p>
          </Span>
          <Span>
            <p className="nav-link" onClick={this.showProgress}>
              Progress
            </p>
          </Span>
          <Span>
            <p className="nav-link" onClick={this.showNotes}>
              Notes
            </p>
          </Span>
        </Menu>

        {this.state.status && (
          <Modal
            closeModal={this.closeModal}
            component={<UpdateStatus closeModal={this.closeModal} _id={_id} />}
            show={this.state.status}
          />
        )}
        {this.state.notes && (
          <Modal
            closeModal={this.closeModal}
            component={
              <JobNotes
                _id={_id}
                company={company}
                notes={notes}
                closeModal={this.closeModal}
              />
            }
            show={this.state.notes}
          />
        )}
        {this.state.progress && (
          <Modal
            closeModal={this.closeModal}
            component={
              <UpdateProgress
                closeModal={this.closeModal}
                _id={_id}
                progress={progress}
              />
            }
            show={this.state.progress}
          />
        )}
        {this.state.update && (
          <Modal
            closeModal={this.closeModal}
            component={
              <UpdateJob
                job={this.props.job}
                closeModal={this.closeModal}
                _id={_id}
              />
            }
            show={this.state.update}
          />
        )}
      </div>
    );
  }
}

export default Job;
