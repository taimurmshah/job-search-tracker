import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import TemplateNavbar from "./TemplateNavbar";
import NewTemplate from "./NewTemplate";
import ViewTemplates from "./ViewTemplates";
import UpdateTemplate from "./UpdateTemplate";
import { clearTemplate } from "../../redux/actions/template";
import { closeModal } from "../../redux/actions/modal";
import { readAllTemplatesThunk } from "../../redux/thunks/template";

const Templates = ({
  templates,
  readAllTemplatesThunk,
  clearTemplate,
  closeModal
}) => {
  useEffect(() => {
    templates.length === 0 && readAllTemplatesThunk();
  }, []);

  const [view, setView] = useState(false);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleView = () => {
    clearTemplate();
    setView(true);
    setCreate(false);
    setUpdate(false);
  };

  const handleCreate = () => {
    clearTemplate();
    setCreate(true);
    setView(false);
    setUpdate(false);
  };

  const handleUpdate = () => {
    setUpdate(true);
    setView(false);
    setCreate(false);
  };

  return (
    <div>
      <TemplateNavbar view={handleView} create={handleCreate} />
      {view && <ViewTemplates update={handleUpdate} />}
      {create && <NewTemplate closeModal={closeModal} />}
      {update && <UpdateTemplate closeModal={closeModal} />}
    </div>
  );
};

const mapStateToProps = state => ({ templates: state.template.templates });

const mapDispatchToProps = dispatch => {
  return {
    readAllTemplatesThunk: () => dispatch(readAllTemplatesThunk()),
    clearTemplate: () => dispatch(clearTemplate()),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Templates);
