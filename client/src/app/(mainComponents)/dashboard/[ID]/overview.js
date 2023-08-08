"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Overview({ setPatient, dispatch }) {
  let apiUrl = "https://9861-41-210-154-57.ngrok-free.app";
  const [recentPatients, setRecentPatients] = useState([]);
  const [pendingPatients, setPendingPatients] = useState([]);
  useEffect(() => {
    const baseUrl = "http://localhost:5000/api/v1/patients";
    axios
      .get(baseUrl)
      .then((response) => {
        setRecentPatients(response.data.patients);
        // console.log(recentPatients);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const baseUrl = "http://localhost:5000/api/v1/pendingPatients";
    axios
      .get(baseUrl)
      .then((res) => {
        setPendingPatients(res.data.pendingPatients);
      })
      .catch((err) => console.log(err));
  }, []);

  const viewRecentPatient = (code) => {
    let patient = recentPatients.filter(
      (patient) => patient.uniqueCode === code
    );
    setPatient(patient[0]);
    dispatch({ type: "patient" });

    console.log(patient);
  };
  const viewPendingPatient = (code) => {
    let patient = pendingPatients.filter(
      (patient) => patient.uniqueCode === code
    );
    setPatient(patient[0]);
    dispatch({ type: "patient" });

    console.log(patient);
  };

  const displayRecentPatients = (patientObj) => {
    return patientObj.map((patient) => {
      return (
        <div className="patient-div" key={new Date().getTime() + Math.random()}>
          <div className="name">
            <p>{`${patient.firstName} ${patient.lastName}`}</p>
            <p>{patient.uniqueCode}</p>
          </div>
          <button onClick={() => viewRecentPatient(patient.uniqueCode)}>
            <i className="bi bi-play-circle icon"></i>
          </button>
        </div>
      );
    });
  };
  const displayPendingPatients = (patientObj) => {
    return patientObj.map((patient) => {
      return (
        <div className="patient-div" key={new Date().getTime() + Math.random()}>
          <div className="name">
            <p>{`${patient.firstName} ${patient.lastName}`}</p>
            <p>{patient.uniqueCode}</p>
          </div>
          <button onClick={() => viewPendingPatient(patient.uniqueCode)}>
            <i className="bi bi-play-circle icon"></i>
          </button>
          <button
            onClick={() => callPatient(patient.telephone, patient.firstName)}
          >
            <i className="bi bi-telephone bell-icon"></i>
          </button>
          <button onClick={() => sendSMS(patient.telephone, patient.firstName)}>
            <i className="bi bi-bell bell-icon"></i>
          </button>
        </div>
      );
    });
  };

  // send sms
  const sendSMS = (phone, name) => {
    let data = {
      phone_number: "0773431724",
      name: name,
    };
    const baseUrl = `${apiUrl}/kimra_api/send_instant_refill_reminder`;
    axios
      .post(baseUrl, data)
      .then((res) => console.log("success"))
      .catch((err) => console.log(err));
  };
  // to call patient
  const callPatient = (phone, name) => {
    let data = {
      phone_number: "0773431724",
      message: `Hello ${name}, Kindly go and pick up your medications from the hospital. Thank you`,
    };
    const baseUrl = `${apiUrl}/kimra_api/make_direct_call`;
    axios
      .post(baseUrl, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="overview-container">
      <div className="patients">
        <h3>Recent Patients</h3>
        <div className="patient-info first-slide">
          {recentPatients
            ? displayRecentPatients(recentPatients)
            : "No recent patients"}
        </div>
      </div>
      <div className="patients">
        <h3>Pending Patients</h3>
        <div className="patient-info">
          {pendingPatients
            ? displayPendingPatients(pendingPatients)
            : "No pending patients"}
        </div>
      </div>
    </div>
  );
}
