"use client";
import Overview from "./overview";
import SideBar from "./sideBar";
import Patient from "./patient";
import Refill from "./refill";
import History from "./history";
import AddNewPatient from "./addPatient";
import RefillDetails from "./refillDetails";
import { useReducer, useState } from "react";
import "./style.css";
import Header from "./header";
import DailyRecord from "./dailyRecord";

export default function Dashboard() {
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    sex: "",
    dateOfBirth: "",
    age: "",
    contact: "",
    address: "",
    viralLoad: "",
    cd4Count: "",
  });

  const [refillHistory, setRefillHistory] = useState([]);
  const [dailyRecords, setDailyRecord] = useState([]);
  const [specificRefillData, setSpecificRefillData] = useState();
  const [doctor, setDoctor] = useState("");

  const reducer = (display, action) => {
    switch (action.type) {
      case "overview":
        return {
          overviewTab: true,
          patientTab: false,
          refillTab: false,
          historyTab: false,
          addPatient: false,
          refillDetails: false,
          dailyRecord: false,
        };
        break;
      case "patient":
        return {
          overviewTab: false,
          patientTab: true,
          refillTab: false,
          historyTab: false,
          addPatient: false,
          refillDetails: false,
          dailyRecord: false,
        };
        break;
      case "refill":
        return {
          overviewTab: false,
          patientTab: false,
          refillTab: true,
          historyTab: false,
          addPatient: false,
          refillDetails: false,
          dailyRecord: false,
        };
        break;
      case "history":
        return {
          overviewTab: false,
          patientTab: false,
          refillTab: false,
          historyTab: true,
          addPatient: false,
          refillDetails: false,
          dailyRecord: false,
        };
        break;
      case "addPatient":
        return {
          overviewTab: false,
          patientTab: false,
          refillTab: false,
          historyTab: false,
          addPatient: true,
          refillDetails: false,
          dailyRecord: false,
        };
        break;
      case "refillDetails":
        return {
          overviewTab: false,
          patientTab: false,
          refillTab: false,
          historyTab: false,
          addPatient: false,
          refillDetails: true,
          dailyRecord: false,
        };
        break;
      case "dailyRecord":
        return {
          overviewTab: false,
          patientTab: false,
          refillTab: false,
          historyTab: false,
          addPatient: false,
          refillDetails: false,
          dailyRecord: true,
        };
        break;

      default:
        break;
    }
  };

  const [display, dispatch] = useReducer(reducer, {
    overviewTab: true,
    patientTab: false,
    refillTab: false,
    historyTab: false,
    addPatient: false,
    refillDetails: false,
  });

  const renderElement = () => {
    const {
      overviewTab,
      patientTab,
      refillTab,
      historyTab,
      addPatient,
      refillDetails,
      dailyRecord,
    } = display;
    if (overviewTab) {
      return (
        <Overview
          setPatient={setPatient}
          dispatch={dispatch}
          setRefillHistory={setRefillHistory}
        />
      );
    } else if (patientTab) {
      return <Patient patient={patient} />;
    } else if (refillTab) {
      return <Refill doctor={doctor} />;
    } else if (historyTab) {
      return (
        <History
          dispatch={dispatch}
          refillHistory={refillHistory}
          setSpecificRefillData={setSpecificRefillData}
        />
      );
    } else if (addPatient) {
      return <AddNewPatient setPatient={setPatient} dispatch={dispatch} />;
    } else if (refillDetails) {
      return (
        <RefillDetails
          specificRefillData={specificRefillData}
          patient={patient}
        />
      );
    } else if (dailyRecord) {
      return <DailyRecord dailyRecords={dailyRecords} />;
    }
  };
  return (
    <>
      <Header
        setPatient={setPatient}
        dispatch={dispatch}
        setRefillHistory={setRefillHistory}
        setDailyRecord={setDailyRecord}
        doctor={doctor}
        setDoctor={setDoctor}
      />
      <div className="dashboard">
        <div className="sidebar">
          <SideBar dispatch={dispatch} display={display} />
        </div>
        <div className="patient-components">{renderElement()}</div>
      </div>
    </>
  );
}
