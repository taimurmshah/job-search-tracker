import { login, signup } from "../actions/auth";
import { URL } from "../../resources";

export const signupThunk = userObj => async dispatch => {
  try {
    let res = await fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        ...userObj
      })
    });

    res = await res.json();

    localStorage.setItem("token", res.token);

    dispatch(signup(res.user));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};

export const loginThunk = userObj => async dispatch => {
  try {
    let res = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        ...userObj
      })
    });

    res = await res.json();

    localStorage.setItem("token", res.token);

    dispatch(login(res.user));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};
