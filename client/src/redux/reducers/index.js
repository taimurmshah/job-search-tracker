import { combineReducers } from "redux";
import auth from "./auth";
import job from "./job";
import employee from "./employee";
import template from "./template";

const rootReducer = combineReducers({ auth, job, employee, template });

export default rootReducer;
