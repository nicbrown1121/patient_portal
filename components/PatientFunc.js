import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";

function PatientFunc() {
  const [patientData, setPatientData] = useState([]);
  const { user, dispatch } = useContext(UserContext);

  useEffect(() => {
    console.log("Token log: ", user.token);
    fetch("http://localhost:3001/patient", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        console.log("response", response);
        return response.json();
      })
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

export default PatientFunc;
