"use client";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Header({
  setPatient,
  dispatch,
  setRefillHistory,
  setDailyRecord,
  doctor,
  setDoctor,
}) {
  const router = useRouter();
  const currentRoute = usePathname();
  const routeArray = currentRoute.split("/");
  let doctorId = routeArray[routeArray.length - 1];
  let date = new Date().toDateString();
  // const [doctor, setDoctor] = useState("");

  // manage session
  useEffect(() => {
    const baseUrl = "http://localhost:5000/api/v1/doctor";
    axios
      .post(baseUrl, { doctorId: doctorId })
      .then((response) => {
        if (response.status === 202) {
          setDoctor(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        router.push("/");
      });
  }, []);

  // function to search a patient
  const searchPatient = () => {
    let code = document.getElementById("patientCode").value;
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
          let refilledList = res.data.previousRefills[0].refill;
          let lastItem = refilledList[refilledList.length - 1];
          let viralLoad = lastItem.viralLoad;
          let cd4Count = lastItem.cd4Count;
          let patient = res.data.patient;
          setPatient({ ...patient, viralLoad: viralLoad, cd4Count: cd4Count });
          setRefillHistory(res.data.previousRefills[0].refill);
          dispatch({ type: "patient" });
        } else {
          setPatient(res.data.patient);
          setRefillHistory([]);
          dispatch({ type: "patient" });
        }
      })
      .catch((err) => console.log(err));

    baseUrl = "http://localhost:5000/api/v1/getDailyRecords";
    axios
      .post(baseUrl, { patientCode: code }, config)
      .then((res) => setDailyRecord(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="header">
      <div className="logo">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="rgb(82, 82, 252)"
            className="bi bi-plus-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </button>
        <p>HIVART</p>
      </div>
      <div className="greeting-div">
        <p>{`Hello, Welcome!`}</p>
        <p className="date">{date}</p>
      </div>
      <div className="search-div">
        <input type="text" id="patientCode" placeholder="search patient" />
        <button onClick={searchPatient}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="rgb(82, 82, 252)"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
