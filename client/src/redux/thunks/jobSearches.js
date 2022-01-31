import {
  getJobSearches,
  newJobSearch,
  updateJobSearch,
  deleteJobSearch,
} from "../actions/jobSearch";

export const newJobSearchThunk = (jobSearchObj) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/job-searches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(jobSearchObj),
    });

    res = await res.json();

    return dispatch(newJobSearch(res));
  } catch (err) {
    console.log({ err });
  }
};

export const readJobSearchesThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    console.log("Read job searches thunk hit");
    let res = await fetch(`${process.env.REACT_APP_URL}/job-searches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    });

    res = await res.json();

    console.log("res in read job searches thunk:", res);

    return dispatch(getJobSearches(res));
  } catch (err) {
    console.log({ err });
  }
};

export const updateJobSearchThunk = (jobSearchId, updates) => async (
  dispatch
) => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(
      `${process.env.REACT_APP_URL}/job-searches/${jobSearchId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updates),
      }
    );

    let response = await res.json();
    dispatch(updateJobSearch(response));
  } catch (err) {
    console.log({ err });
  }
};

export const deleteJobSearchThunk = (jobSearchId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/jobs/${jobSearchId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    });
    let job = await res.json();
    dispatch(deleteJobSearch(job));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};
