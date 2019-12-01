import React, { Component } from "react";
import {
  HeaderContainer,
  Menu,
  Span
} from "../resusable-components/styledComponents";

class Job extends Component {
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
        </Menu>
      </div>
    );
  }
}

export default Job;
