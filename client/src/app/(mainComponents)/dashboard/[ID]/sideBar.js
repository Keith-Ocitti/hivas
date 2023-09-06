import {
  faBars,
  faCake,
  faClipboard,
  faClipboardCheck,
  faClipboardList,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoutIcon from "../icons/box-arrow-right.svg";
import overviewIcon from "../icons/list.svg";
import patientIcon from "../icons/person.svg";
import refillLogo from "../icons/hourglass.svg";
import historyLogo from "../icons/clock-history.svg";
import addPatientLogo from "../icons/person-plus.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SideBar({ dispatch }) {
  const router = useRouter();
  const logout = () => {
    router.push("/");
  };
  return (
    <div className="sideBar-container">
      <button onClick={() => dispatch({ type: "overview" })}>
        <Image src={overviewIcon} alt="" height={25} className="sidebar-icon" />
        Overview
      </button>
      <button onClick={() => dispatch({ type: "patient" })}>
        <Image src={patientIcon} alt="" height={25} className="sidebar-icon" />
        Patient
      </button>
      <button onClick={() => dispatch({ type: "refill" })}>
        <Image src={refillLogo} alt="" height={23} className="sidebar-icon" />
        Refill
      </button>
      <button onClick={() => dispatch({ type: "history" })}>
        <Image src={historyLogo} alt="" height={23} className="sidebar-icon" />
        History
      </button>
      <button onClick={() => dispatch({ type: "dailyRecord" })}>
        <FontAwesomeIcon
          icon={faClipboard}
          style={{ color: "black", marginRight: "5px" }}
        />
        Daily Record
      </button>
      <button onClick={() => dispatch({ type: "addPatient" })}>
        <Image
          src={addPatientLogo}
          alt=""
          height={25}
          className="sidebar-icon"
        />
        Add Patient
      </button>
      <button className="logout-btn" onClick={logout}>
        <Image src={logoutIcon} height={25} alt="" className="sidebar-icon" />
        Logout
      </button>
    </div>
  );
}
