import { getJobs, newJob, refreshCurrentJob } from "../actions/job";
import { URL } from "../../resources";

export const newJobThunk = jobObj => async dispatch => {
  const token = localStorage.getItem("token");

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

    return dispatch(newJob(res));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};

export const readJobsThunk = () => async dispatch => {
  const token = localStorage.getItem("token");
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

export const getJobByIdThunk = jobId => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(`${URL}/jobs/${jobId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      }
    });

    res = await res.json();
    dispatch(refreshCurrentJob(res));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};
