"use client";
import { useState } from "react";
import axios from "axios";

export default function Refill({ doctor }) {
  // console.log(patient);
  // console.log(doctor);
  let apiUrl = "https://f9e1-41-210-143-238.ngrok-free.app";

  const [refillData, setRefillData] = useState({
    patientCode: "",
    medicine: "",
    status: "",
    cd4Count: "",
    viralLoad: "",
    nextRefillDate: "",
    issuingStaff: `${doctor.name} ${doctor.lastName}`,
    generalNotes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRefillData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createRefill = () => {
    const baseUrl = "http://localhost:5000/api/v1/createRefill";
    axios
      .post(baseUrl, { ...refillData })
      .then((res) => {
        console.log("success");
        setRefillReminder();
        alert("Refill added successfully");
      })
      .catch((err) => console.log(err));
    // console.log(refillData);
  };
  // function for set Refill reminder
  const setRefillReminder = () => {
    let phone;
    let name;
    const baseUrl = "https://45fb-41-210-155-189.ngrok-free.app";
    let patientCode = refillData.patientCode;
    axios
      .post(baseUrl, { patientCode: patientCode })
      .then((res) => {
        console.log(res.data.patient);
        phone = res.data.patient.telephone;
        name = res.data.patient.firstName;
      })
      .then((res) => {
        axios.post(`${apiUrl}/kimra_api/set_next_refill_reminder`, {
          name: name,
          phone_number: phone,
          send_date: refillData.nextRefillDate,
        });
      })
      .then((res) => console.log("success"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="refill-container">
      <div className="refill-form">
        <p>Create Refill</p>
        <div className="flex-box">
          <div className="input-field">
            <div className="input-tag">
              <p>Patient Code</p>
            </div>
            <div className="input-field-div">
              <input
                type="text"
                value={refillData.patientCode}
                onChange={handleChange}
                name="patientCode"
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input-tag">
              <p>Medicine</p>
            </div>
            <div className="input-value-div">
              <select
                id="medicine"
                value={refillData.medicine}
                onChange={handleChange}
                name="medicine"
              >
                <option>---</option>
                <option>ARV-1</option>
                <option>ARV-2</option>
                <option>ARV-3</option>
                <option>ARV-4</option>
                <option>ARV-5</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex-box">
          <div className="input-field">
            <div className="input-tag">
              <p>CD4 Count</p>
            </div>
            <div className="input-field-div">
              <input
                type="text"
                value={refillData.cd4Count}
                onChange={handleChange}
                name="cd4Count"
              />
            </div>
          </div>
          <div className="input-field">
            <div className="input-tag">
              <p>Refill Status</p>
            </div>
            <div className="input-value-div">
              <select
                id="refillStatus"
                onChange={handleChange}
                value={refillData.status}
                name="status"
              >
                <option>---</option>
                <option>On time</option>
                <option>Late</option>
              </select>
            </div>
          </div>
        </div>
        <div className="input-field">
          <div className="input-tag">
            <p>Viral Load</p>
          </div>
          <div className="input-field-div">
            <input
              type="text"
              value={refillData.viralLoad}
              onChange={handleChange}
              name="viralLoad"
            />
          </div>
        </div>
        <div className="input-field">
          <div className="input-tag">
            <p>Next Refill Date</p>
          </div>
          <div className="input-field-div">
            <input
              type="date"
              onChange={handleChange}
              value={refillData.nextRefillDate}
              name="nextRefillDate"
            />
          </div>
        </div>
        {/* <div className="input-field">
          <div className="input-tag">
            <p>Issuing Staff</p>
          </div>
          <div className="input-field-div">
            <input
              type="text"
              readOnly={true}
              onChange={handleChange}
              defaultValue={refillData.issuingStaff}
              name="issuingStaff"
            />
          </div>
        </div> */}
        <div className="input-field">
          <div className="input-tag">
            <p>General Notes</p>
          </div>
          <div className="input-field-div">
            <textarea
              value={refillData.generalNotes}
              onChange={handleChange}
              name="generalNotes"
            ></textarea>
          </div>
        </div>
        <button onClick={createRefill}>Issue Refill</button>
      </div>
    </div>
  );
}
