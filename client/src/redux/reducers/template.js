const initialState = {
  templates: [],
  selectedTemplate: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "READ_TEMPLATES":
      return {
        ...state,
        templates: action.payload,
      };
    case "NEW_TEMPLATE":
      return {
        ...state,
        templates: [...state.templates, action.payload],
      };
    case "UPDATE_TEMPLATE":
      console.log(
        "Did update template reducer get hit??? here's the payload:",
        action.payload
      );
      let updatedTemplates = [...state.templates];
      let index = updatedTemplates.findIndex(
        (t) => t._id === action.payload._id
      );
      updatedTemplates[index] = action.payload;

      return {
        ...state,
        templates: updatedTemplates,
      };
    case "SELECT_TEMPLATE":
      const template = state.templates.find((t) => t._id === action.payload);
      return { ...state, selectedTemplate: template };
    case "DELETE_TEMPLATE":
      console.log("delete template action being hit");
      let newTemplates = [...state.templates];
      newTemplates = newTemplates.filter((t) => t._id !== action.payload._id);
      return { ...state, templates: newTemplates };
    case "CLEAR_TEMPLATE":
      return {
        ...state,
        selectedTemplate: {},
      };
    default:
      return state;
  }
}
