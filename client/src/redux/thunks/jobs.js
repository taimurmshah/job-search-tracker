import { loadJobs } from "../actions/jobs";
import { URL } from "../../resources";

export const readJobsThunk = token => async dispatch => {
  try {
    let res = await fetch(`${URL}/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      }
    });

    res = await res.json();
    return dispatch(loadJobs(res.jobs));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};
