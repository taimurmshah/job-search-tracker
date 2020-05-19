import React, { Component } from "react";
import { connect } from "react-redux";
import TemplateNavbar from "./TemplateNavbar";
import NewTemplate from "./NewTemplate";
import ViewTemplates from "./ViewTemplates";
import UpdateTemplate from "./UpdateTemplate";

class Templates extends Component {
  state = {
    view: false,
    create: false,
    update: false
  };

  view = () => {
    this.props.clearTemplate();
    this.setState({
      view: true,
      create: false,
      update: false
    });
  };

  create = () => {
    this.props.clearTemplate();
    this.setState({
      view: false,
      create: true,
      update: false
    });
  };

  update = () => {
    this.setState({
      view: false,
      create: false,
      update: true
    });
  };

  closeModal = () => {
    this.props.clearTemplate();
    this.props.closeModal();
  };

  render() {
    return (
      <div>
        <TemplateNavbar
          view={this.view}
          create={this.create}
          clear={this.props.clear}
        />
        {this.state.view && <ViewTemplates update={this.update} />}
        {this.state.create && (
          <NewTemplate closeModal={this.props.closeModal} />
        )}
        {this.state.update && (
          <UpdateTemplate closeModal={this.props.closeModal} />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // clearTemplate: () => dispatch(clearTemplate)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Templates);
