const initialState = {
  jobs: [],
  currentJob: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "NEW_JOB":
      return {
        ...state,
        jobs: [...state.jobs, action.payload]
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
    case "REFRESH_CURRENT_JOB":
      return { ...state, currentJob: action.payload };
    case "REMOVE_CURRENT_JOB":
      return { ...state, currentJob: {} };
    default:
      return state;
  }
}
