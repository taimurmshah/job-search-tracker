import {
  clearTemplate,
  newTemplate,
  readTemplates,
  updateTemplate,
  deleteTemplate,
} from "../actions/template";

export const newTemplateThunk = (templateObj) => async (dispatch) => {
  const token = localStorage.getItem("token");
  console.log("in new template thunk, here's the templateObj:", templateObj);
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}/templates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(templateObj),
    });

    const result = await res.json();

    console.log({ result });

    dispatch(newTemplate(result));
  } catch (err) {
    console.log({ err });
  }
};

export const readAllTemplatesThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}/templates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    });

    const result = await res.json();
    dispatch(readTemplates(result));
  } catch (err) {
    console.log({ err });
  }
};

export const updateTemplateThunk = (templateObj, templateId) => async (
  dispatch
) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${process.env.REACT_APP_URL}/templates/${templateId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify(templateObj),
      }
    );

    const result = await res.json();

    console.log({ result });

    dispatch(updateTemplate(result));
  } catch (err) {
    console.log({ err });
  }
};

export const deleteTemplateThunk = (templateId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${process.env.REACT_APP_URL}/templates/${templateId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }
    );

    let template = await res.json();
    dispatch(deleteTemplate(template));
    dispatch(clearTemplate());
  } catch (err) {
    console.log({ err });
  }
};
