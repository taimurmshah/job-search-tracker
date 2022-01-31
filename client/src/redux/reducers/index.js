import { combineReducers } from "redux";
import auth from "./auth";
import jobSearch from "./jobSearch";
import job from "./job";
import employee from "./employee";
import template from "./template";
import modal from "./modal";
import massEmail from "./massEmail";

const rootReducer = combineReducers({
  auth,
  job,
  jobSearch,
  employee,
  template,
  modal,
  massEmail,
});

export default rootReducer;
