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
