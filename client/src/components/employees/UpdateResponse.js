import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
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

  render() {
    const {
      currentEmployee: { name },
      closeModal,
      submitHandler
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
            <button onClick={closeModal}>No</button>
          </Span>
        </ButtonContainer>

        {this.state.response && (
          <Span>
            <p>Statuses Here</p>
          </Span>
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

export default connect(mapStateToProps)(UpdateResponse);

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
