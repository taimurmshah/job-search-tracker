const initialState = {
  templates: [],
  selectedTemplate: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "READ_TEMPLATES":
      return {
        ...state,
        templates: action.payload
      };
    case "NEW_TEMPLATE":
      return {
        ...state,
        templates: [...state.templates, action.payload]
      };
    case "SELECT_TEMPLATE":
      // debugger;
      const template = state.templates.find(t => t._id === action.payload);
      return { ...state, selectedTemplate: template };
    case "CLEAR_TEMPLATE":
      return {
        ...state,
        selectedTemplate: {}
      };
    default:
      return state;
  }
}
