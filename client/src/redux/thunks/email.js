// import { URL } from "../../resources";

export const sendGmailThunk = (employeeId, emailObj) => async dispatch => {
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
  } catch (err) {
    //todo handle error
  }
};
