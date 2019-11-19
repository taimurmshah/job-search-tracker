import { URL } from "../../resources";

export const sendGmailThunk = (employeeId, emailObj) => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    let res = await fetch(`${URL}/gmail/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      },
      body: JSON.stringify({ employeeId, emailObj })
    });

    res = await res.json();
  } catch (err) {
    //todo handle error
  }
};
