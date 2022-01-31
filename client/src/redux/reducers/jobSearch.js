const initialState = {
  jobSearches: [],
  activeJobSearch: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_JOB_SEARCHES":
      return {
        ...state,
        jobSearches: action.payload,
      };
    case "NEW_JOB_SEARCH":
      return {
        ...state,
        jobSearches: [action.payload, ...state.jobSearches],
      };
    case "UPDATE_JOB_SEARCH":
      let updatedJobSearches = [...state.jobSearches];
      let index = updatedJobSearches.findIndex(
        (j) => j._id === action.payload._id
      );
      updatedJobSearches[index] = action.payload;
      return {
        ...state,
        jobSearches: updatedJobSearches,
      };
    case "DELETE_JOB_SEARCH":
      let newJobSearches = [...state.jobSearches];
      newJobSearches = newJobSearches.filter(
        (j) => j.title !== action.payload.title
      );
      return {
        ...state,
        jobSearches: newJobSearches,
      };
    default:
      return state;
  }
}
