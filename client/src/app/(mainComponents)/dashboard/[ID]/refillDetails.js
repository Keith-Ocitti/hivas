export default function RefillDetails({ specificRefillData }) {
  return (
    <div className="refill-container">
      <div className="refill-form">
        <p>Refill Details</p>
        <div className="input-field">
          <div className="input-tag">
            <p>Medicine</p>
          </div>
          <div className="input-value-div">
            <p>{specificRefillData.medicine}</p>
          </div>
        </div>
        <div className="input-field">
          <div className="input-tag">
            <p>CD4 Count</p>
          </div>
          <div className="input-field-div">
            <input
              type="text"
              readOnly={true}
              defaultValue={specificRefillData.cd4Count}
            />
          </div>
        </div>
        <div className="input-field">
          <div className="input-tag">
            <p>Viral Load</p>
          </div>
          <div className="input-field-div">
            <input
              type="text"
              readOnly={true}
              defaultValue={specificRefillData.viralLoad}
            />
          </div>
        </div>
        <div className="input-field">
          <div className="input-tag">
            <p>Date Administered</p>
          </div>
          <div className="input-field-div">
            <input
              type="text"
              readOnly={true}
              defaultValue={specificRefillData.dateCreated}
            />
          </div>
        </div>
        <div className="input-field">
          <div className="input-tag">
            <p>Issuing Staff</p>
          </div>
          <div className="input-field-div">
            <input
              type="text"
              readOnly={true}
              defaultValue={specificRefillData.issuingStaff}
            />
          </div>
        </div>
        <div className="input-field">
          <div className="input-tag">
            <p>General Notes</p>
          </div>
          <div className="input-field-div">
            <textarea value={specificRefillData.generalNotes}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
