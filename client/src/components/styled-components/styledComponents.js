import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  // height: 300px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px 15px;
  margin: 10px 0;
`;

export { FormContainer, Input };
