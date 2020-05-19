import React, { Component } from "react";
import { connect } from "react-redux";
import { updateJobThunk } from "../../redux/thunks/job";
import {
  HeaderContainer,
  InputContainer,
  TableButton,
  Span
} from "../resusable-components/styledComponents";
import styled from "styled-components";

class JobNotes extends Component {
  state = {
    notes: this.props.notes
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.state.notes === this.props.notes) {
      return this.props.closeModal();
    }
    this.props.updateJobThunk(this.props._id, this.state);
    this.props.closeModal();
  };

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
            value={this.state.notes}
            onChange={this.changeHandler}
            id=""
            cols="30"
            rows="20"
          />
        </InputContainer>
        <HeaderContainer>
          <TableButton onClick={this.submitHandler}>Save</TableButton>
          <Span />
          <TableButton onClick={this.props.closeModal}>Close</TableButton>
        </HeaderContainer>
      </div>
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
)(JobNotes);

const Title = styled.h3`
  font-size: 25px;
`;

const Notes = styled.textarea`
  margin: 15px;
`;
