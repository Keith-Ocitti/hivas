export default function History({
  dispatch,
  refillHistory,
  setSpecificRefillData,
}) {
  const setRefillData = (id) => {
    // console.log(id);
    let speificRefill = refillHistory.filter((refill) => refill.id === id)[0];
    // console.log(speificRefill);
    setSpecificRefillData(speificRefill);
    dispatch({ type: "refillDetails" });
  };
  const displayRefill = (refillObj) => {
    return refillObj.map((refill) => {
      return (
        <div
          className="refill-details"
          key={new Date().getTime() + Math.random()}
        >
          <div className="refill-date">{refill.dateCreated}</div>
          <div className="medicine">{refill.medicine}</div>
          <div className="status">
            {refill.status === "On time" ? (
              <button className="ontime">On time</button>
            ) : (
              <button className="late">Late</button>
            )}
          </div>
          <div>
            <button
              className="view"
              // onClick={() => dispatch({ type: "refillDetails" })}
              onClick={() => setRefillData(refill.id)}
            >
              View
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="history-container">
      <h3>Past Refill Visits</h3>
      <div className="refill-details title-bar">
        <div className="refill-date">
          <b>Refill Date</b>
        </div>
        <div className="medicine">
          <b>Medicine</b>
        </div>
        <div className="status">
          <b>Status</b>
        </div>
      </div>
      <div className="refill-info-container">
        {refillHistory ? displayRefill(refillHistory) : "No refill history"}
      </div>
    </div>
  );
}
