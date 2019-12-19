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
  padding: 5px 10px;
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

const HeaderContainer = styled.div`
  display: flex;
  width: 100;
  justify-content: center;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: 300px;
`;

const Span = styled.span`
  padding: 10px;
  margin: 5px;
`;

const ModalNav = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

const FormButton = styled.button`
  width: 80px;
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #ffffff;
  background-color: rgb(12, 96, 146);
  text-align: center;
  transition: all 0.2s;
`;

// a.button3{
//   display:inline-block;
//   padding:0.3em 1.2em;
//   margin:0 0.3em 0.3em 0;
//   border-radius:2em;
//   box-sizing: border-box;
//   text-decoration:none;
//   font-family:'Roboto',sans-serif;
//   font-weight:300;
//   color:#FFFFFF;
//   background-color:#4eb5f1;
//   text-align:center;
//   transition: all 0.2s;
// }

export {
  FormContainer,
  Input,
  InputContainer,
  HeaderContainer,
  Menu,
  Span,
  ModalNav,
  FormButton
};
