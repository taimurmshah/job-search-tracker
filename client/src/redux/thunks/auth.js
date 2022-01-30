import { login, signup, googleLogin, authorize, logout } from "../actions/auth";
// import { process.env.REACT_APP_URL } from "../../resources";

export const signupThunk = (userObj) => async (dispatch) => {
  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...userObj,
      }),
    });

    res = await res.json();

    localStorage.setItem("token", res.token);

    dispatch(signup(res.user));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};

export const loginThunk = (userObj) => async (dispatch) => {
  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...userObj,
      }),
    });

    res = await res.json();

    localStorage.setItem("token", res.token);

    dispatch(login(res.user));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};

export const googleOAuthThunk = (code) => async (dispatch) => {
  try {
    console.log("o auth thunk CODE:", code);
    let res = await fetch(`${process.env.REACT_APP_URL}/oauth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ code }),
    });

    res = await res.json();

    localStorage.setItem("token", res.token);
    console.log("RES:", res);
    dispatch(googleLogin(res.user));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};

export const jwtThunk = (token) => async (dispatch) => {
  try {
    let res = await fetch(`${process.env.REACT_APP_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    });
    res = await res.json();

    return dispatch(authorize(res));
  } catch (err) {
    //todo configure auth errors with redux...
  }
};

export const logoutThunk = (token) => async (dispatch) => {
  console.log("LogoutThunk is hit!");
  try {
    await fetch(`${process.env.REACT_APP_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    });
    localStorage.removeItem("token");
    return dispatch(logout());
  } catch (err) {
    //todo configure auth errors with redux...
  }
};
