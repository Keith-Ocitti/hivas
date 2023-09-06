export default function Patient({ patient }) {
  // calculate patients age
  let date = patient.dateOfBirth.split("-")[0];
  let CurrentDate = new Date().toLocaleDateString().split("/")[2];
  let age = Number(CurrentDate) - Number(date);

  return (
    <div className="patient-static-info">
      <h3>Patient information</h3>
      <p>Current Patient Details</p>
      <div className="static-info-div">
        <div className="details">
          <div className="tag-div">
            <p>Full name:</p>
          </div>
          <div className="tag-info-div">
            <p>{`${patient.firstName} ${patient.lastName}`}</p>
          </div>
        </div>
        <div className="details">
          <div className="tag-div">
            <p>Sex:</p>
          </div>
          <div className="tag-info-div">
            <p>{patient.sex}</p>
          </div>
        </div>
        <div className="details">
          <div className="tag-div">
            <p>Date of Birth:</p>
          </div>
          <div className="tag-info-div">
            <p>{patient.dateOfBirth}</p>
          </div>
        </div>
        <div className="details">
          <div className="tag-div">
            <p>Age:</p>
          </div>
          <div className="tag-info-div">
            <p>{`${age} years`}</p>
          </div>
        </div>
        <div className="details">
          <div className="tag-div">
            <p>Contact:</p>
          </div>
          <div className="tag-info-div">
            <p>{patient.telephone}</p>
          </div>
        </div>
        <div className="details">
          <div className="tag-div">
            <p>Address:</p>
          </div>
          <div className="tag-info-div">
            <p>{patient.address}</p>
          </div>
        </div>
        <div className="details">
          <div className="tag-div">
            <p>Viral Count:</p>
          </div>
          <div className="tag-info-div">
            <p>
              {patient.viralLoad
                ? patient.viralLoad
                : " New Patient - Not Available"}
            </p>
          </div>
        </div>
        <div className="details">
          <div className="tag-div">
            <p>CD4 Count:</p>
          </div>
          <div className="tag-info-div">
            <p>
              {patient.cd4Count
                ? patient.cd4Count
                : "New Patient - Not Available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
