"use client";
import { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login({ handleLogin }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  // function to login
  const login = () => {
    const baseUrl = "http://localhost:5000/api/v1/login";
    axios
      .post(baseUrl, { ...loginData })
      .then((response) => {
        if (response.status === 202) {
          sessionStorage.setItem("lastName", response.data.lastName);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("name", response.data.name);
          sessionStorage.setItem("position", response.data.position);
          sessionStorage.setItem("loggedIn", true);
          router.push(`/dashboard/${response.data.doctorId}`);
        }
      })
      .catch((err) => {
        setLoggedIn("Invalid credentials");
        router.push("/");
      });
  };
  return (
    <>
      <div className="login-container">
        <div className="input-holder">
          <div className="login">
            <div className="div1 sign-up-logo-div">
              <FontAwesomeIcon icon={faCirclePlus} className="login-icon" />
              <h4>HIVART</h4>
            </div>
            <div className="div2">
              <h5 className="loggedErrorMsg">{loggedIn ? loggedIn : ""}</h5>
              <label>Email</label>
              <input
                type="text"
                placeholder="email"
                className="login-input"
                required
                value={loginData.email}
                onChange={handleLoginChange}
                name="email"
              />
              <br />
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                className="login-input"
                required
                value={loginData.password}
                onChange={handleLoginChange}
                name="password"
              />

              <br />
              <p id="forgot-password-p" onClick={() => router.push("/reset")}>
                Forgot password?Reset
              </p>
              <button className="login-btn" onClick={login}>
                Login
              </button>
            </div>
            <p className="signup-link">
              Don't have an account yet?{" "}
              <span onClick={handleLogin}>Signup</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
