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
