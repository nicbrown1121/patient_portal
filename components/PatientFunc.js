import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function PatientFunc() {
  const { user, dispatch } = useContext(UserContext);
  const queryClient = useQueryClient();

  const patients = queryClient.getQueryData(["patient"]);

  console.log("patient on PatientFunc.js", patients);

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
