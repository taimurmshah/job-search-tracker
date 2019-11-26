import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px 15px;
  margin: 10px 0;
  background-color: #fff;
  color: rgb(26, 31, 33);
  border-right-color: rgb(54, 66, 71);
  border-left-color: #b6c0cc;
  border-bottom-color: #b6c0cc;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export { FormContainer, Input, InputContainer };
