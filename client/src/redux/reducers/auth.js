const initialState = {
  currentUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SIGNUP":
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}
