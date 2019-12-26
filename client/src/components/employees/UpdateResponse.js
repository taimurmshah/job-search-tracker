import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateJobThunk } from "../../redux/thunks/job";
import {
  Span,
  HeaderContainer
} from "../resusable-components/styledComponents";

class UpdateResponse extends Component {
  state = {
    response: false
  };

  clickHandler = () => {
    this.setState({ response: true });
  };

  close = () => {
    this.setState({ response: false });
    this.props.closeModal();
  };

  submit = e => {
    const update = { status: e.target.innerText };
    this.props.submitHandler();
    this.props.updateJobThunk(this.props._id, update);
  };

  render() {
    const {
      currentEmployee: { name }
    } = this.props;

    if (!name) return null;
    return (
      <Container>
        <HeaderContainer>
          <p>Did {name.split(" ")[0]} email you back?</p>
        </HeaderContainer>
        <ButtonContainer>
          <Span>
            <button onClick={this.clickHandler}>Yes</button>
          </Span>

          <Span>
            <button onClick={this.close}>No</button>
          </Span>
        </ButtonContainer>

        {this.state.response && (
          <>
            <HeaderContainer>
              <p>Update Status</p>
            </HeaderContainer>
            <Span onClick={this.submit}>
              <p className="nav-link">
                Submitted application; waiting for company response
              </p>
            </Span>
            <Span onClick={this.submit}>
              <p className="nav-link">Phone screen</p>
            </Span>
            <Span onClick={this.submit}>
              <p className="nav-link">On-site</p>
            </Span>
            <Span onClick={this.submit}>
              <p className="nav-link">Offer</p>
            </Span>
            <Span onClick={this.submit}>
              <p className="nav-link">Rejected</p>
            </Span>
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentEmployee: state.employee.currentEmployee
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateJobThunk: (jobId, updates) => dispatch(updateJobThunk(jobId, updates))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateResponse);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
