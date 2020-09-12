import {
  getJobs,
  newJob,
  refreshCurrentJob,
  hasJobs,
  updateJob,
  getProgressInfo,
  deleteJob,
  removeCurrentJob
} from "../actions/job";

export const newJobThunk = jobObj => async dispatch => {
  const token = localStorage.getItem("token");

  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/jobs`, {
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
    let res = await fetch(`${process.env.REACT_APP_URL}/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      }
    });

    res = await res.json();
    if (res.length > 0) {
      dispatch(hasJobs());
    }
    return dispatch(getJobs(res));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};

export const getJobByIdThunk = jobId => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/jobs/${jobId}`, {
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

export const updateJobThunk = (jobId, updates) => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/jobs/${jobId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      },
      body: JSON.stringify(updates)
    });

    let response = await res.json();
    // debugger;
    dispatch(updateJob(response));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};

export const deleteJobThunk = jobId => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      }
    });
    let job = await res.json();
    deleteJob(job);
    removeCurrentJob();
  } catch (err) {
    //todo configure auth errors with redux...
  }
};

export const progressThunk = () => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/jobs/d3/progress`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      }
    });

    let info = await res.json();
    dispatch(getProgressInfo(info));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};
