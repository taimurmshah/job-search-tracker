import { getJobs, newJob } from "../actions/job";
import { URL } from "../../resources";

const token = localStorage.getItem("token");

export const newJobThunk = jobObj => async dispatch => {
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

export const readJobsThunk = () => async dispatch => {
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
    return dispatch(getJobs(res));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};
