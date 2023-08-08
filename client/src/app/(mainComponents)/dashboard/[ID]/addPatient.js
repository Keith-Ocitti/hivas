"use client";
import axios from "axios";
import { useState } from "react";

export default function AddNewPatient({ setPatient, dispatch }) {
  let apiUrl = "https://9861-41-210-154-57.ngrok-free.app";
  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    telephone: "",
    nextOfKin: "",
    drugTime: "",
    address: "",
    sex: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPatient((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const setReminder = () => {
    const baseUrl = `${apiUrl}/kimra_api/set_daily_call_reminder
    `;
    let send_time = newPatient.drugTime;
    let phone = newPatient.telephone;
    let name = newPatient.firstName;
    let data = {
      send_time: send_time,
      phone_number: phone,
      name: name,
    };
    axios
      .post(baseUrl, data)
      .then((res) => {
        console.log(res), console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const createPatient = () => {
    const baseUrl = "http://localhost:5000/api/v1/createPatient";
    axios
      .post(baseUrl, { ...newPatient })
      .then((res) => {
        console.log("success");
        alert(
          `Patient with code ${res.data.patient.uniqueCode} successfully created`
        );
        setPatient(res.data.patient);
        dispatch({ type: "patient" });
        // console.log(res.data);
        setReminder();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="add-patient-container">
      <div className="patient-form">
        <h3>Create new patient</h3>
        <h4>Please enter patient details</h4>
        <div className="form-row1">
          <div className="first-name">
            <p>First Name</p>
            <input
              type="text"
              value={newPatient.firstName}
              onChange={handleChange}
              name="firstName"
            />
          </div>
          <div className="last-name">
            <p>Last Name</p>
            <input
              type="text"
              value={newPatient.lastName}
              onChange={handleChange}
              name="lastName"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-tag">
            <p>Sex</p>
          </div>
          <div className="form-value">
            <input
              type="text"
              value={newPatient.sex}
              onChange={handleChange}
              name="sex"
            />
          </div>
        </div>
        <div className="form-row1">
          <div className="first-name">
            <p>Date of Birth</p>
            <input
              type="date"
              value={newPatient.dateOfBirth}
              onChange={handleChange}
              name="dateOfBirth"
            />
          </div>
          <div className="last-name">
            <p>Drug Time</p>
            <input
              type="time"
              value={newPatient.drugTime}
              onChange={handleChange}
              name="drugTime"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-tag">
            <p>Telephone</p>
          </div>
          <div className="form-value">
            <input
              type="text"
              value={newPatient.telephone}
              onChange={handleChange}
              name="telephone"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-tag">
            <p>Next of Kin</p>
          </div>
          <div className="form-value">
            <input
              type="text"
              value={newPatient.nextOfKin}
              onChange={handleChange}
              name="nextOfKin"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-tag">
            <p>Address</p>
          </div>
          <div className="form-value">
            <input
              type="text"
              value={newPatient.address}
              onChange={handleChange}
              name="address"
            />
          </div>
        </div>
        <button className="create-patient-btn" onClick={createPatient}>
          Create Patient
        </button>
      </div>
    </div>
  );
}
