import axios from "axios";

import { loginStart, loginFailed, loginSuccess } from "../features/userSlice";

export const loginHandler = async (
  email: string,
  password: string,
  dispatch: any
) => {
  try {
    dispatch(loginStart());

    const res = await axios.post("http://localhost:4000/api/v1/auth/login", {
      email,
      password,
    });
    console.log(res.data);

    dispatch(loginSuccess(res.data));

    localStorage.setItem("user", JSON.stringify(res.data));
    console.log(localStorage.getItem("user"));
  } catch (error) {
    console.log(error);

    dispatch(loginFailed());
  }
};
