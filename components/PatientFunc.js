import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

function PatientFunc() {
  // const [patientData, setPatientData] = useState([]);
  const { user, dispatch } = useContext(UserContext);

  // useEffect(() => {
  //   console.log("Token log: ", user.token);
  //   fetch("http://localhost:3001/patient", {
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   })
  //     .then((response) => {
  //       console.log("response", response);
  //       return response.json();
  //     })
  //     .then((data) => setPatientData(data));
  // }, []);

  const fetchPatients = async () => {
    const res = await fetch("http://localhost:3001/patient", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // console.log("res", res);
    const data = await res.json();
    // console.log("data", data);
    return data;
  };

  const {
    data: patientData,
    isLoading,
    error,
  } = useQuery({ queryKey: ["patient"], queryFn: fetchPatients });

  console.log("patientData", patientData);

  return (
    <div>
      <h3 style={{ fontSize: "30px" }}>Patient List </h3>
      <div className="patientCard">
        <table className="patientTable">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>DOB</th>
              <th>MRN</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody className="patientList">
            {/* {patientData.data &&
              patientData.data.map((patient) => (
                <tr className="row" key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.dateOfBirth}</td>
                  <td>{patient.id}</td>
                  <td>{patient.location}</td>
                  <button
                    className="patientButton"
                    onClick={() => handleAssessment(patient.mrn)}
                  >
                    Go to Patient
                  </button>
                </tr>
              ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientFunc;
