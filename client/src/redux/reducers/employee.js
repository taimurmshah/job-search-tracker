const initialState = {
  employees: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "NEW_EMPLOYEE":
      return {
        ...state,
        jobs: [...state.employees, action.payload]
      };
    case "GET_EMPLOYEES":
      return { ...state, employees: action.payload };
    default:
      return state;
  }
}
