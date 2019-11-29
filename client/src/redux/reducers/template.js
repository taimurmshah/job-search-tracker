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
    default:
      return state;
  }
}
