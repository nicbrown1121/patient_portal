import React, { useEffect, useState } from "react";

function Patient() {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/patient", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPatientData(data));
  }, []);

  console.log("patientData", patientData);

  return (
    <div>
      {patientData.map((patient) => (
        <div key={patient.patientID}>
          <h2>{patient.name}</h2>
          {/* render other patient data here */}
        </div>
      ))}
    </div>
  );
}

export default Patient;
