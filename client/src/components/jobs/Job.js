import React, { Component } from "react";

class Job extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.job.company}</h1>
        <ul className="job-links">
          <li>
            <a
              href={this.props.job.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            {/* todo standardize this on backend*/}
            <a
              href={"https://" + this.props.job.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </li>
          <li>
            <a
              href={this.props.job.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Job Description
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Job;
