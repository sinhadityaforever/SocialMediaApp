import React from "react";
import { useRef } from "react";
import { loginHandler } from "../../apiCalls/authCalls";
import "./login.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedUser = useAppSelector((state) => state.user.user);
  const selectIsFetching = useAppSelector((state) => state.user.isFetching);
  const selectedError = useAppSelector((state) => state.user.error);
  const email: any = useRef<HTMLHeadingElement>(null);
  const password: any = React.useRef<HTMLHeadingElement>();
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginHandler(email.current.value, password.current.value, dispatch);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocioApp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocioApp.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength={6}
              className="loginInput"
              ref={password}
            />
            <button
              type="submit"
              className="loginButton"
              disabled={selectIsFetching}
            >
              {selectIsFetching ? (
                <CircularProgress size="25px" color="primary" />
              ) : (
                "Log In"
              )}
            </button>

            <button
              className="loginRegisterButton"
              onClick={() => navigate("/register")}
            >
              {selectIsFetching ? (
                <CircularProgress size="25px" style={{ color: "white" }} />
              ) : (
                "Create A New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
