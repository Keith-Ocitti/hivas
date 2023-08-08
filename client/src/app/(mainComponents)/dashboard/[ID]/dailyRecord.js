export default function DailyRecord({ dailyRecords }) {
  const displayRecords = (recordObj) => {
    return recordObj.map((record) => {
      return (
        <div
          className="refill-details"
          key={new Date().getTime() + Math.random()}
        >
          <div className="refill-date">{record.date}</div>
          <div className="medicine">{record.medicineStatus}</div>
          <div className="refill-date">{record.callStatus}</div>
        </div>
      );
    });
  };
  return (
    <div className="history-container">
      <h3>Daily Track Record</h3>
      <div className="refill-details title-bar">
        <div className="refill-date">
          <b>Date</b>
        </div>
        <div className="refill-date">
          <b>Medicine Status</b>
        </div>
        <div className="medicine">
          <b>Call Status</b>
        </div>
      </div>
      <div className="refill-info-container">
        {dailyRecords ? displayRecords(dailyRecords) : "No previous records"}
      </div>
    </div>
  );
}
