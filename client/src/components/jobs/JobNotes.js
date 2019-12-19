import React, { Component } from "react";
import { connect } from "react-redux";
import {
  HeaderContainer,
  InputContainer,
  FormButton
} from "../resusable-components/styledComponents";
import styled from "styled-components";

class JobNotes extends Component {
  render() {
    let { company } = this.props;
    return (
      <div>
        <HeaderContainer>
          <Title>{company} Notes</Title>
        </HeaderContainer>
        <InputContainer>
          <Notes
            required
            name="notes"
            // value={this.state.message}
            // onChange={this.changeHandler}
            id=""
            cols="30"
            rows="20"
          />
        </InputContainer>
        <HeaderContainer>
          <FormButton>Save</FormButton>
          <FormButton>Close</FormButton>
        </HeaderContainer>
      </div>
    );
  }
}

export default JobNotes;

const Title = styled.h3`
  font-size: 25px;
`;

const Notes = styled.textarea`
  margin: 15px;
`;

// const ButtonFlex = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   justify-content: center;
//   padding: 10px;
// `;
