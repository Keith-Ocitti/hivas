"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Overview({ setRefillHistory, setPatient, dispatch }) {
  // api to twilio
  let apiUrl = "https://f9e1-41-210-143-238.ngrok-free.app";

  // states
  const [recentPatients, setRecentPatients] = useState([]);
  const [pendingPatients, setPendingPatients] = useState([]);

  // function to fetch recent patients
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

  // function to search a patient
  const searchPatient = (code) => {
    let baseUrl = "http://localhost:5000/api/v1/previousRefills";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "",
      },
    };
    axios
      .post(baseUrl, { id: code }, config)
      .then((res) => {
        let refillArray = res.data.previousRefills;
        if (refillArray.length > 0) {
          setRefillHistory(res.data.previousRefills[0].refill);
        } else {
          setRefillHistory([]);
        }
      })
      .catch((err) => console.log(err));

    baseUrl = "http://localhost:5000/api/v1/getDailyRecords";
    axios
      .post(baseUrl, { patientCode: code }, config)
      .then((res) => setDailyRecord(res.data))
      .catch((err) => console.log(err));
  };

  // function to get pending Patients
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
    searchPatient(code);

    dispatch({ type: "patient" });

    console.log(patient);
  };
  const viewPendingPatient = (code) => {
    let patient = pendingPatients.filter(
      (patient) => patient.uniqueCode === code
    );
    setPatient(patient[0]);
    searchPatient(code);
    dispatch({ type: "patient" });

    console.log(patient);
  };

  // function to loop through recent patient state and display them
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

  // function to loop through pending patient state and display them
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
      phone_number: phone,
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
      phone_number: phone,
      message: `Hello, Kindly go and pick up your medications from the hospital. Thank you`,
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
        <h3>Delayed Patients</h3>
        <div className="patient-info">
          {pendingPatients
            ? displayPendingPatients(pendingPatients)
            : "No pending patients"}
        </div>
      </div>
    </div>
  );
}
