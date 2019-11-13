export const loadJobs = jobs => {
  return {
    type: "LOAD_JOBS",
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
