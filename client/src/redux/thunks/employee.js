import { newEmployee, getEmployees, updateEmployee } from "../actions/employee";
import { URL } from "../../resources";
import employee from "../reducers/employee";

const token = localStorage.getItem("token");

export const newEmployeeThunk = (employee, jobId) => async dispatch => {
  try {
    let res = await fetch(`${URL}/jobs/${jobId}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      },
      body: JSON.stringify(employee)
    });

    res = await res.json();

    console.log({ res });

    return dispatch(newEmployee(res));
  } catch (err) {
    //todo handle error
  }
};

export const getEmployeesThunk = jobId => async dispatch => {
  try {
    let res = await fetch(`${URL}/jobs/${jobId}/employees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      }
    });

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
  try {
    let res = await fetch(`${URL}/jobs/${jobId}/employees/${employeeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      },
      body: JSON.stringify(updates)
    });

    res = await res.json();

    return dispatch(updateEmployee(res));
  } catch (err) {
    //todo handle error
  }
};
