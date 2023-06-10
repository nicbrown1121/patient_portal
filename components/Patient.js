import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkTokenExpiration } from "../pages/auth";

function Patient({ id }) {
  const { user, dispatch } = useContext(UserContext);
  const queryClient = useQueryClient();
  console.log("in Patient.js");

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const currPatient = queryClient
    .getQueryData(["patient"])
    .data.find((patient) => patient.id === parseInt(id, 10));

  console.log("currPatient", currPatient);

  const handleCreateNote = () => {};

  return (
    <div>
      <div className="patientInfo">
        <h2 style={{ textAlign: "center" }}>{currPatient.name}</h2>
      </div>
      <div className="patientPage">
        <div className="notesColumn">
          <div className="patientCards">
            <h2>Notes</h2>
            <button className="patientButton" onClick={handleCreateNote}>
              Create Note
            </button>
          </div>
        </div>
        <div className="rightColumn">
          <div className="patientCards">
            <h2>Current Admission</h2>
            <ol> Admission Date: {currPatient.dateOfAdmission}</ol>
            <ol> Diagnosis: {currPatient.diagnosis} </ol>
            <ol> Location: {currPatient.location} </ol>
          </div>
          <div className="patientCards">
            <h2>Anthropometric Data</h2>
            <ol>Height: 72 inches</ol>
            <ol>Weight: 178 lbs</ol>
            <ol> BMI: 27.2 </ol>
          </div>
          <div className="patientCards">
            <h2>Diet </h2>
            <ol>PO Status: PO </ol>
            <ol>Diet Order: NAS, renal </ol>
            <ol>Fluid Restriction: 1200ml </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;
