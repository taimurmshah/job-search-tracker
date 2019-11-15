export const newEmployee = employee => {
  return {
    type: "NEW_EMPLOYEE",
    payload: employee
  };
};

export const getEmployees = employees => {
  return {
    type: "GET_EMPLOYEES",
    payload: employees
  };
};

export const updateEmployee = employee => {
  console.log("in action, action.payload:", employee);
  return {
    type: "UPDATE_EMPLOYEE",
    payload: employee
  };
};
