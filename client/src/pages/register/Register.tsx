import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router";

const Register = () => {
  const username: any = useRef();
  const email: any = useRef();
  const password: any = useRef();
  const confirmPassword: any = useRef();
  const navigate = useNavigate();
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
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER}/auth/register`,
          user
        );
        if (res.status === 200) {
          alert("Successfully registered. Please log in");
          navigate("/login");
        } else {
          alert("Failed to register");
        }
      } catch (error) {
        console.log(error);
        alert("Request failed");
      }
    }
  };

  return (
    <form className="login" onSubmit={clickHandler}>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialSite</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Username"
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
              placeholder="Password"
              className="loginInput"
              ref={password}
              required
              type="password"
              minLength={6}
            />
            <input
              placeholder="Password Again"
              className="loginInput"
              ref={confirmPassword}
              required
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
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
