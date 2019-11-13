import { combineReducers } from "redux";
import auth from "./auth";
import job from "./job";
import employee from "./employee";

const rootReducer = combineReducers({ auth, job, employee });

export default rootReducer;
