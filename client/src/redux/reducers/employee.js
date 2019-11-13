const initialState = {
  employees: []
};

//todo how to handle when the component dismounts?

export default function(state = initialState, action) {
  switch (action.type) {
    case "NEW_EMPLOYEE":
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    case "GET_EMPLOYEES":
      return { ...state, employees: action.payload };
    default:
      return state;
  }
}
