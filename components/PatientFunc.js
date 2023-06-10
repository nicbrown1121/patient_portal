import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkTokenExpiration } from "../pages/auth";

function PatientFunc() {
  const { user, dispatch } = useContext(UserContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const patients = queryClient.getQueryData(["patient"]);

  console.log("patient on PatientFunc.js", patients);

  const handleAssessment = (patientId) => {
    console.log("in handle assessment", patientId);
    router.push(`/patient/${patientId}`);
  };

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
            {patients &&
              patients.data.map((patient) => (
                <tr className="row" key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.dateOfBirth}</td>
                  <td>{patient.id}</td>
                  <td>{patient.location}</td>
                  <button
                    className="patientButton"
                    onClick={() => handleAssessment(patient.id)}
                  >
                    Go to Patient
                  </button>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientFunc;
