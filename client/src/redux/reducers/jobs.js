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
    case "LOAD_JOBS":
      return { ...state, jobs: action.payload };
    default:
      return state;
  }
}
