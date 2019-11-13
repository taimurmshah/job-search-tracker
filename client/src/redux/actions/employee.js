export const newEmployee = employee => {
  return {
    type: "NEW_EMPLOYEE",
    payload: employee
  };
};
