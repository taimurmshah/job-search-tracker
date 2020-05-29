import {
  newEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
} from "../actions/employee";

export const newEmployeeThunk = (employee, jobId) => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(
      `${process.env.REACT_APP_URL}/jobs/${jobId}/employees`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token
        },
        body: JSON.stringify(employee)
      }
    );

    res = await res.json();

    console.log({ res });

    return dispatch(newEmployee(res));
  } catch (err) {
    //todo handle error
  }
};

export const getEmployeesThunk = jobId => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(
      `${process.env.REACT_APP_URL}/jobs/${jobId}/employees`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token
        }
      }
    );

    res = await res.json();

    return dispatch(getEmployees(res));
  } catch (err) {
    //todo handle error
  }
};

export const updateEmployeeThunk = (
  jobId,
  employeeId,
  updates
) => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(
      `${process.env.REACT_APP_URL}/jobs/${jobId}/employees/${employeeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token
        },
        body: JSON.stringify(updates)
      }
    );

    res = await res.json();

    return dispatch(updateEmployee(res));
  } catch (err) {
    //todo handle error
  }
};

export const deleteEmployeeThunk = (jobId, employeeId) => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(
      `${process.env.REACT_APP_URL}/jobs/${jobId}/employees/${employeeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token
        }
      }
    );

    res = await res.json();
    return dispatch(deleteEmployee(res));
  } catch (err) {
    //todo handle error
  }
};
