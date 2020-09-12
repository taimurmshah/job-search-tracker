import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { removeCurrentEmployee } from "../../redux/actions/employee";
import { closeModal } from "../../redux/actions/modal";
import EmailNavbar from "./EmailNavbar";
import SendCustomEmail from "./SendCustomEmail";
import EmailModalTemplateList from "../templates/EmailModalTemplateList";

const EmailContainer = ({ removeCurrentEmployee }) => {
  const [template, setTemplate] = useState(false);
  const [newEmail, setNewEmail] = useState(false);

  //todo readAllTemplatesThunk should happen in joblistcontainer
  useEffect(() => {
    return () => removeCurrentEmployee();
  }, []);

  const selectTemplate = () => {
    setTemplate(true);
    setNewEmail(false);
  };

  const selectNewEmail = () => {
    setTemplate(false);
    setNewEmail(true);
  };

  return (
    <div>
      <EmailNavbar template={selectTemplate} newEmail={selectNewEmail} />

      {newEmail && <SendCustomEmail />}

      {template && <EmailModalTemplateList />}
    </div>
  );
};

const mapStateToProps = state => ({ templates: state.template.templates });

const mapDispatchToProps = dispatch => {
  return {
    removeCurrentEmployee: () => dispatch(removeCurrentEmployee()),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailContainer);
