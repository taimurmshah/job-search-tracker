import React, { Component } from "react";

class Job extends Component {
  render() {
    let { company, linkedIn, link, website } = this.props.job;

    website = "https://" + website;

    link = link.startsWith("http") ? link : "https://" + link;

    return (
      <div>
        <h1>{company}</h1>
        <ul className="job-links">
          <li>
            <a
              className="nav-link"
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            {/* todo standardize this on backend*/}
            <a
              className="nav-link"
              href={website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </li>
          <li>
            <a
              className="nav-link"
              href={link}
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
