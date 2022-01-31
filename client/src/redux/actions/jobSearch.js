export const getJobSearches = (jobSearches) => {
  return {
    type: "GET_JOB_SEARCHES",
    payload: jobSearches,
  };
};

export const newJobSearch = (jobSearch) => {
  return {
    type: "NEW_JOB_SEARCH",
    payload: jobSearch,
  };
};

export const updateJobSearch = (jobSearch) => {
  return {
    type: "UPDATE_JOB_SEARCH",
    payload: jobSearch,
  };
};

export const deleteJobSearch = (jobSearch) => {
  return {
    type: "DELETE_JOB_SEARCH",
    payload: jobSearch,
  };
};
