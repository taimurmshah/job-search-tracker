import React, { Component } from "react";
import { connect } from "react-redux";
import Checkbox from "../resusable-components/Checkbox";
import { updateJobThunk } from "../../redux/thunks/job";
import {
  HeaderContainer,
  List,
  Span,
  FormButton
} from "../resusable-components/styledComponents";
import styled from "styled-components";

class UpdateProgress extends Component {
  state = { progress: this.props.progress };

  clickHandler = e => {
    let text = e.target.nextElementSibling.nextElementSibling.innerText;
    if (e.target.checked) {
      this.setState(
        {
          progress: [...this.state.progress, text]
        },
        () => console.log("this.state:", this.state)
      );
    } else {
      let newProg = [...this.state.progress].filter(t => t !== text);
      this.setState({ progress: newProg }, () =>
        console.log("this.state:", this.state)
      );
    }
  };

  submitHandler = e => {
    e.preventDefault();
    console.log("The submit handler is getting clicked");
    this.props.updateJobThunk(this.props._id, this.state);
    this.props.closeModal();
  };

  render() {
    const { progress } = this.props;
    console.log({ progress });
    console.log("this.state:", this.state);

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
              checked={this.state.progress.includes("Applied") && true}
            />
          </Span>
          <Span>
            <Checkbox
              text="Phone Screen"
              clickHandler={this.clickHandler}
              position="flex-start"
              checked={this.state.progress.includes("Phone Screen")}
            />
          </Span>
          <Span>
            <Checkbox
              text="Code Challenge"
              clickHandler={this.clickHandler}
              position="flex-start"
              checked={this.state.progress.includes("Code Challenge")}
            />
          </Span>
          <Span>
            <Checkbox
              text="Technical Interview"
              clickHandler={this.clickHandler}
              position="flex-start"
              checked={this.state.progress.includes("Technical Interview")}
            />
          </Span>
          <Span>
            <Checkbox
              text="Onsite"
              clickHandler={this.clickHandler}
              position="flex-start"
              checked={this.state.progress.includes("Onsite")}
            />
          </Span>
          <Span>
            <Checkbox
              text="Offer"
              clickHandler={this.clickHandler}
              position="flex-start"
              checked={this.state.progress.includes("Offer")}
            />
          </Span>
        </List>
        <HeaderContainer>
          <FormButton onClick={this.submitHandler}>Save</FormButton>
          <FormButton onClick={this.props.closeModal}>Close</FormButton>
        </HeaderContainer>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateJobThunk: (jobId, updates) => dispatch(updateJobThunk(jobId, updates))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UpdateProgress);
