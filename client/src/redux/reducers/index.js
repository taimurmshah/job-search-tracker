import { combineReducers } from "redux";
import auth from "./auth";
import job from "./job";
import employee from "./employee";
import template from "./template";
import modal from "./modal";

const rootReducer = combineReducers({ auth, job, employee, template, modal });

export default rootReducer;
