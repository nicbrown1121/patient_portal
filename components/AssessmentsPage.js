import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function AssessmentsPage() {
  const { user, dispatch } = useContext(UserContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  const patients = queryClient.getQueryData(["patient"]);

  console.log("on AssessmentPage.js", patients);

  let seenPatients = {};
  let unseenPatients = {};

  if (patients !== undefined) {
    seenPatients = patients.data.filter((patient) => patient.seen);
    unseenPatients = patients.data.filter((patient) => !patient.seen);
  }

  const goToPatient = (patientId) => {
    console.log("patientId", patientId);
    router.push(`/patient/${patientId}`);
  };

  return (
    <div>
      <h3 style={{ fontSize: "30px" }}>Initial Assessments Due </h3>
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
              unseenPatients.map((patient) => (
                <tr className="row" key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.dateOfBirth}</td>
                  <td>{patient.id}</td>
                  <td>{patient.location}</td>
                  <button
                    className="patientButton"
                    onClick={() => goToPatient(patient.id)}
                  >
                    Go to Patient
                  </button>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <h3 style={{ fontSize: "30px" }}>Reassessments Due </h3>
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
              seenPatients.map((patient) => (
                <tr className="row" key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.dateOfBirth}</td>
                  <td>{patient.id}</td>
                  <td>{patient.location}</td>
                  <button
                    className="patientButton"
                    onClick={() => goToPatient(patient.id)}
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

export default AssessmentsPage;
