const initialState = {
  employees: [],
  currentEmployee: {}
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
    case "REMOVE_EMPLOYEES":
      return { ...state, employees: [] };
    case "UPDATE_EMPLOYEE":
      let updatedEmployees = [...state.employees];
      let index = updatedEmployees.findIndex(e => e._id === action.payload._id);
      updatedEmployees[index] = action.payload;
      return {
        ...state,
        employees: updatedEmployees
      };
    case "DELETE_EMPLOYEE":
      let removed = [...state.employees].filter(
        e => e._id !== action.payload._id
      );
      return {
        ...state,
        employees: removed
      };
    case "CURRENT_EMPLOYEE":
      const currentEmployee = state.employees.filter(
        e => e._id === action.payload
      )[0];
      return { ...state, currentEmployee };
    case "REMOVE_CURRENT_EMPLOYEE":
      return {
        ...state,
        currentEmployee: {}
      };

    default:
      return state;
  }
}
