const initialState = {
  currentUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SIGNUP":
    case "LOGIN":
    case "AUTHORIZE":
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      return {
        ...state,
        currentUser: {}
      };
    default:
      return state;
  }
}
