import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useNavigate } from "react-router";

const Register = () => {
  const username: any = useRef();
  const email: any = useRef();
  const password: any = useRef();
  const confirmPassword: any = useRef();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState<string>("Sign Up");

  const validateUsername = async () => {
    if (username.current.value) {
      if (username.current.value.includes(" ")) {
        setButtonText("No Spaces Allowed");
      } else {
        setButtonText("Sign Up");
        const result = await axios.get(
          `${process.env.REACT_APP_SERVER}/users/validate/${username.current.value}`
        );
        if (result.status === 201) {
          setButtonText("Username Already Exists");
        } else {
          setButtonText("Sign Up");
        }
      }
    }
  };
  const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        setButtonText("Loading");
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER}/auth/register`,
          user
        );
        if (res.status === 200) {
          alert("Successfully registered. Please log in");
          navigate("/login");
        } else {
          alert("Failed to register");
          setButtonText("Sign Up");
        }
      } catch (error) {
        console.log(error);
        alert("Request failed");
        setButtonText("Sign Up");
      }
    }
  };

  return (
    <form className="login" onSubmit={clickHandler}>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocioApp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocioApp.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              onChange={validateUsername}
              placeholder="Username: No Spaces Accepted"
              className="loginInput"
              ref={username}
              required
            />
            <input
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
              type="email"
            />
            <input
              placeholder="Password: At least 6 characters"
              className="loginInput"
              ref={password}
              required
              type="password"
              minLength={6}
            />
            <input
              placeholder="Confirm Password"
              className="loginInput"
              ref={confirmPassword}
              required
              type="password"
            />
            <button
              className="loginButton"
              type="submit"
              disabled={buttonText !== "Sign Up"}
            >
              {buttonText}
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/login")}
            >
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Register;
