import React, { Component } from "react";
import TemplateNavbar from "./TemplateNavbar";
import NewTemplate from "./NewTemplate";
import ViewTemplates from "./ViewTemplates";

class Templates extends Component {
  state = {
    view: false,
    create: false
  };

  view = () => {
    this.setState({
      view: true,
      create: false
    });
  };

  create = () => {
    this.setState({
      view: false,
      create: true
    });
  };

  render() {
    return (
      <div>
        <TemplateNavbar view={this.view} create={this.create} />
        {this.state.view && <ViewTemplates />}
        {this.state.create && (
          <NewTemplate closeModal={this.props.closeModal} />
        )}
      </div>
    );
  }
}

export default Templates;
