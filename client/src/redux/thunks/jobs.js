import { loadJobs, newJob } from "../actions/jobs";
import { URL } from "../../resources";

export const newJobThunk = (jobObj, token) => async dispatch => {
  try {
    let res = await fetch(`${URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      },
      body: JSON.stringify(jobObj)
    });

    res = await res.json();
    console.log({ res });
    return dispatch(newJob(res));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};

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
    return dispatch(loadJobs(res));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};
