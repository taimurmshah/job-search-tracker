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

export const removeEmployees = () => {
  return {
    type: "REMOVE_EMPLOYEES"
  };
};

export const updateEmployee = employee => {
  return {
    type: "UPDATE_EMPLOYEE",
    payload: employee
  };
};

export const currentEmployee = employeeId => {
  return {
    type: "CURRENT_EMPLOYEE",
    payload: employeeId
  };
};

export const removeCurrentEmployee = () => {
  return {
    type: "REMOVE_CURRENT_EMPLOYEE"
  };
};
