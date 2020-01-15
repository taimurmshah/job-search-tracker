export const newTemplate = template => {
  return {
    type: "NEW_TEMPLATE",
    payload: template
  };
};

export const readTemplates = templates => {
  return {
    type: "READ_TEMPLATES",
    payload: templates
  };
};

export const selectTemplate = templateId => {
  return {
    type: "SELECT_TEMPLATE",
    payload: templateId
  };
};

export const updateTemplate = template => {
  return {
    type: "UPDATE_TEMPLATE",
    payload: template
  };
};

export const clearTemplate = () => {
  return {
    type: "CLEAR_TEMPLATE"
  };
};
