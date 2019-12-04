//todo dispatch success messages

export const newResumeThunk = formData => async dispatch => {
  console.log("hitting new resume thunk");

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
    console.log("new resume thunk error");
    console.log({ err });
  }
};

export const editResumeThunk = formData => async dispatch => {
  console.log("hitting edit resume thunk");
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

    await console.log(
      "in the edit resume thunk try, here's the res:",
      res,
      "I think it's breaking because the body is empty and I'm trying to convert it to json"
    );

    console.log("res.status:", res.status);
    // const result = await res.json();
    // console.log({ result });
  } catch (err) {
    console.log("edit resume thunk error");
    console.log({ err });
  }
};
