import React, { Component } from "react";
import { connect } from "react-redux";
import Checkbox from "../resusable-components/Checkbox";
import { updateJobThunk } from "../../redux/thunks/job";
import {
  HeaderContainer,
  List,
  Span
} from "../resusable-components/styledComponents";
import styled from "styled-components";

class UpdateProgress extends Component {
  state = { progress: this.props.progress };

  clickHandler = e => {
    console.log(
      "text:",
      e.target.nextElementSibling.nextElementSibling.innerText
    );
  };

  submitHandler = () => {};

  render() {
    const { _id, progress, closeModal, updateJobThunk } = this.props;
    console.log({ progress });
    return (
      <>
        <HeaderContainer>
          <p>Update progress below</p>
        </HeaderContainer>
        <List>
          <Span>
            <Checkbox
              text="Applied"
              clickHandler={this.clickHandler}
              position="flex-start"
              checked={progress.includes("Applied") && true}
            />
          </Span>
          <Span>
            <Checkbox
              text="Phone Screen"
              clickHandler={this.clickHandler}
              position="flex-start"
              checked={progress.includes("Phone Screen") && true}
            />
          </Span>
          <Span>
            <Checkbox
              text="Code Challenge"
              clickHandler={this.clickHandler}
              position="flex-start"
              checked={progress.includes("Code Challenge") && true}
            />
          </Span>
          <Span>
            <Checkbox
              text="Technical Interview"
              clickHandler={this.clickHandler}
              position="flex-start"
              checked={progress.includes("Technical Interview") && true}
            />
          </Span>
          <Span>
            <Checkbox
              text="Onsite"
              clickHandler={this.clickHandler}
              position="flex-start"
              checked={progress.includes("Onsite") && true}
            />
          </Span>
          <Span>
            <Checkbox
              text="Offer"
              clickHandler={this.clickHandler}
              position="flex-start"
              checked={progress.includes("Offer") && true}
            />
          </Span>
        </List>
      </>
    );
  }
}

export default connect()(UpdateProgress);
