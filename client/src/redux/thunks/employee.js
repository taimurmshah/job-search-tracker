import { newEmployee } from "../actions/employee";
import { URL } from "../../resources";

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
