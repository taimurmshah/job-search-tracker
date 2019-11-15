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
    case "UPDATE_EMPLOYEE":
      console.log("in reducer, action.payload:", action.payload);
      let updatedEmployees = state.employees;
      let index = updatedEmployees.findIndex(e => e._id === action.payload._id);
      updatedEmployees[index] = action.payload;
      return {
        ...state,
        employees: updatedEmployees
      };
    default:
      return state;
  }
}
