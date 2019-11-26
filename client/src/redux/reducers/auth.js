const initialState = {
  currentUser: {},
  isLoggedIn: false
};

//todo how to handle when the component dismounts?

export default function(state = initialState, action) {
  switch (action.type) {
    case "SIGNUP":
    case "LOGIN":
    case "AUTHORIZE":
    case "GOOGLE_LOGIN":
      return { ...state, currentUser: action.payload, isLoggedIn: true };
    case "NEW_RESUME":
      let userWithResume = state.currentUser;
      userWithResume.resume = true;
      return {
        ...state,
        currentUser: userWithResume
      };
    case "LOGOUT":
      return {
        ...state,
        currentUser: {},
        isLoggedIn: false
      };
    default:
      return state;
  }
}
