//todo dispatch success messages

export const newResumeThunk = formData => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}/users/me/resume`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: token
      },
      body: formData
    });

    const result = await res.json();
    console.log({ result });
  } catch (err) {
    console.log({ err });
  }
};

export const editResumeThunk = formData => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${process.env.REACT_APP_URL}/users/me/resume`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: token
      },
      body: formData
    });

    const result = await res.json();
    console.log({ result });
  } catch (err) {
    console.log({ err });
  }
};
