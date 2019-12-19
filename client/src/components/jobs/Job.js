import React, { Component } from "react";
import Modal from "../layout/Modal";
import UpdateStatus from "./UpdateStatus";
import JobNotes from "./JobNotes";
import {
  HeaderContainer,
  Menu,
  Span
} from "../resusable-components/styledComponents";

class Job extends Component {
  state = {
    status: false,
    notes: false
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
      notes: false
    });
  };

  render() {
    let { company, linkedIn, link, website } = this.props.job;

    website = "https://" + website;

    link = link.startsWith("http") ? link : "https://" + link;

    return (
      <div>
        <HeaderContainer>
          <h1>{company}</h1>
        </HeaderContainer>
        <Menu>
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
            <p className="nav-link" onClick={this.showNotes}>
              Notes
            </p>
          </Span>
        </Menu>

        {this.state.status && (
          <Modal
            closeModal={this.closeModal}
            component={<UpdateStatus closeModal={this.closeModal} />}
            show={this.state.status}
          />
        )}
        {this.state.notes && (
          <Modal
            closeModal={this.closeModal}
            component={
              <JobNotes company={company} closeModal={this.closeModal} />
            }
            show={this.state.notes}
          />
        )}
      </div>
    );
  }
}

export default Job;
