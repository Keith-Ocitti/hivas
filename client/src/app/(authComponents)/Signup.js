"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup({ handleLogin }) {
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    hospital: "",
    position: "",
    password: "",
    email: "",
  });

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  // function to handle signup
  const signup = () => {
    // console.log("clicked!");
    const baseURL = "http://localhost:5000/api/v1/signup";
    axios
      .post(baseURL, { ...signUpData })
      .then((res) => {
        handleLogin();
        alert(`User successfully created with id ${res.data.staff.doctorId}`);
        // setDisplay((prevData) => !prevData);
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="login-container">
        <div className="input-holder">
          <div className="signup">
            <div className="div1">
              <FontAwesomeIcon icon={faCirclePlus} className="login-icon" />
              <h4>HIVART</h4>
            </div>
            <div className="signup-container">
              <label>First Name</label>
              <input
                type="text"
                className="signup-input"
                required
                value={signUpData.firstName}
                onChange={handleSignUpChange}
                name="firstName"
              />
              <label>Last Name</label>
              <input
                type="text"
                className="signup-input"
                required
                value={signUpData.lastName}
                onChange={handleSignUpChange}
                name="lastName"
              />
              <label>Email</label>
              <input
                type="text"
                className="signup-input"
                required
                value={signUpData.email}
                onChange={handleSignUpChange}
                name="email"
              />
              <label>Phone</label>
              <input
                type="text"
                className="signup-input"
                required
                value={signUpData.phone}
                onChange={handleSignUpChange}
                name="phone"
              />
              <label>Hospital</label>
              <input
                type="text"
                className="signup-input"
                required
                value={signUpData.hospital}
                onChange={handleSignUpChange}
                name="hospital"
              />
              <label>Position</label>
              <input
                type="text"
                className="signup-input"
                required
                value={signUpData.position}
                onChange={handleSignUpChange}
                name="position"
              />
              <label>Password</label>
              <input
                type="password"
                className="signup-input"
                required
                value={signUpData.password}
                onChange={handleSignUpChange}
                name="password"
              />
              <button className="signup-btn" onClick={signup}>
                Signup
              </button>
              <p className="signup-link">
                Already have an account?{" "}
                <span onClick={handleLogin}>Login</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
