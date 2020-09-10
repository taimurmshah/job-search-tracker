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
  width: 100%;
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
  width: 110px;
  display: inline-block;
  padding: 5px;
  border: 1.5px black solid;
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

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  padding: 10px;
`;

const TableButton = styled.button`
  width: 140px;
  padding: 10px;
  border-radius: 4px;
  outline: none;
  border: 0;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.25);
  background-color: rgb(15, 174, 241);
  font-weight: bold;
  color: white;
  transition: all 0.25s ease-in-out;
  :hover {
    box-shadow: 0;
    background-color: rgb(146, 211, 239);
  }
`;

const TextArea = styled.textarea`
  margin-top: 10px;
  margin-bottom: 1vh;
  height: 29vh;
  width: 40vw;
  resize: none;
`;

const ButtonsFlexbox = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export {
  FormContainer,
  Input,
  InputContainer,
  HeaderContainer,
  Menu,
  Span,
  ModalNav,
  FormButton,
  List,
  TableButton,
  TextArea,
  ButtonsFlexbox
};
