import { newTemplate, readTemplates } from "../actions/template";

export const newTemplateThunk = templateObj => async dispatch => {
  const token = localStorage.getItem("token");
  console.log("in new template thunk, here's the templateObj:", templateObj);
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}/templates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      },
      body: JSON.stringify(templateObj)
    });

    const result = await res.json();

    console.log({ result });

    dispatch(newTemplate(result));
  } catch (err) {
    console.log({ err });
  }
};

export const readAllTemplatesThunk = () => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}/templates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token
      }
    });

    const result = await res.json();
    console.log(
      "need to dispatch all templates to state, here's the res:",
      result
    );
    dispatch(readTemplates(result));
  } catch (err) {
    console.log({ err });
  }
};
