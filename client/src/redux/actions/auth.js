export const signup = user => {
  return {
    type: "SIGNUP",
    payload: user
  };
};

export const login = user => {
  return {
    type: "LOGIN",
    payload: user
  };
};

export const googleLogin = user => {
  return {
    type: "GOOGLE_LOGIN",
    payload: user
  };
};

//this action is used when a user's jwt is stored in the browser; auth with jwt
export const authorize = user => {
  return {
    type: "AUTHORIZE",
    payload: user
  };
};

export const logout = () => {
  return {
    type: "LOGOUT"
  };
};

export const newResume = () => {
  return {
    type: "NEW_RESUME"
  };
};
