const initialState = {
  employees: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_EMPLOYEE_MASS_EMAIL":
      return { ...state, employees: [...state.employees, action.payload] };
    case "ADD_ALL_EMPLOYEES_MASS_EMAIL":
      return { ...state };
    default:
      return { ...state };
  }
}
