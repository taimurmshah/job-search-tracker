// import { URL } from "../../resources";

import { updateEmployee } from "../actions/employee";

export const sendNewGmailThunk = (employeeId, emailObj) => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/gmail/send/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      },
      body: JSON.stringify({ employeeId, emailObj })
    });

    res = await res.json();
    console.log("res from email thunk, need to dispatch action:", res);
    dispatch(updateEmployee(res.employee));
  } catch (err) {
    console.log("sendNewGmailThunk, here's the error:", err);
    //todo handle error
  }
};

export const sendTemplateGmailThunk = (
  employeeId,
  templateId
) => async dispatch => {
  const token = localStorage.getItem("token");
  console.log("sendTemplateGmailThunk, here's the arguments:", {
    employeeId,
    templateId
  });
  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/gmail/send/template`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      },
      body: JSON.stringify({ employeeId, templateId })
    });

    res = await res.json();
    console.log("res from email thunk, need to dispatch action:", res);
    dispatch(updateEmployee(res.employee));
  } catch (err) {
    console.log("sendTemplateGmailThunk, here's the error:", err);
    //todo handle error
  }
};
