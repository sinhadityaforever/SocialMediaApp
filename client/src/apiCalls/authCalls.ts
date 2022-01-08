import axios from "axios";

import { loginStart, loginFailed, loginSuccess } from "../features/userSlice";

export const loginHandler = async (
  email: string,
  password: string,
  dispatch: any
) => {
  try {
    dispatch(loginStart());

    const res = await axios.post(`${process.env.REACT_APP_SERVER}/auth/login`, {
      email,
      password,
    });

    dispatch(loginSuccess(res.data));

    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (error) {
    alert("Failed to login. Check your credentials.");
    dispatch(loginFailed());
  }
};
