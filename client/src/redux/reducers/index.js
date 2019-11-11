import { combineReducers } from "redux";
import auth from "./auth";
import jobs from "./jobs";

const rootReducer = combineReducers({ auth, jobs });

export default rootReducer;
