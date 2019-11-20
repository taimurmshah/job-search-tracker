export const getJobs = jobs => {
  return {
    type: "GET_JOBS",
    payload: jobs
  };
};

export const newJob = job => {
  return {
    type: "NEW_JOB",
    payload: job
  };
};

export const currentJob = id => {
  return {
    type: "CURRENT_JOB",
    payload: id
  };
};

export const refreshCurrentJob = job => {
  return {
    type: "REFRESH_CURRENT_JOB",
    payload: job
  };
};

export const removeCurrentJob = () => {
  return {
    type: "REMOVE_CURRENT_JOB"
  };
};
