const initialState = {
  jobs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "LOAD_JOBS":
      return { ...state, jobs: action.payload };
    default:
      return state;
  }
}
