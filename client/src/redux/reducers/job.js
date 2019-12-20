const initialState = {
  hasJobs: false,
  jobs: [],
  currentJob: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "HAS_JOBS":
      return { ...state, hasJobs: true };
    case "NEW_JOB":
      return {
        ...state,
        jobs: [action.payload, ...state.jobs]
      };
    case "GET_JOBS":
      return { ...state, jobs: action.payload };
    case "CURRENT_JOB":
      const currentJob = state.jobs.filter(
        job => job._id === action.payload
      )[0];
      return {
        ...state,
        currentJob
      };
    case "UPDATE_JOB":
      console.log(
        "Did update job reducer get hit??? here's the payload:",
        action.payload
      );
      let updatedJobs = [...state.jobs];
      let index = updatedJobs.findIndex(j => j._id === action.payload._id);
      updatedJobs[index] = action.payload;

      return {
        ...state,
        jobs: updatedJobs,
        currentJob: action.payload
      };
    case "REFRESH_CURRENT_JOB":
      return { ...state, currentJob: action.payload };
    case "REMOVE_CURRENT_JOB":
      return { ...state, currentJob: {} };
    default:
      return state;
  }
}
