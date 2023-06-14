import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { checkTokenExpiration } from "../pages/auth";
// import { fetchPatients } from "./api/api";

//check if the user is logged in whenever user changes.
// If they aren't logged in, navigate to the login page.
export default function HomePage() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  async function fetchPatients() {
    const res = await fetch("http://localhost:3001/api/patient", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();
    return data;
  }

  const {
    data: patientData,
    isLoading,
    status,
    fetchStatus,
  } = useQuery({
    queryKey: ["patient"],
    queryFn: fetchPatients,
    cacheTime: "10000",
  });

  // const { data: seenPatientData } = useQuery({
  //   queryKey: ["patient", { seen: true }],
  //   queryFn: fetchPatients,
  //   cacheTime: "10000",
  //   enabled: patientData !== undefined && status === "success",
  //   // Set 'enabled' to true only when the initial patient data has been loaded successfully
  // });

  let seenPatients = {};
  let unseenPatients = {};

  if (patientData !== undefined) {
    if (patientData.auth === false) {
      router.push("/login");
    } else if (status === "success") {
      seenPatients = patientData.data.filter((patient) => patient.seen);
      unseenPatients = patientData.data.filter((patient) => !patient.seen);
    }
  }

  const handleAssessments = () => {
    router.push("/assessments");
  };

  useEffect(() => {
    if (!user.isLoggedIn) {
      router.push("/login");
    }
  }, [user.isLoggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome, {user.username}!</h1>
      <div className="cards">
        <div className="assessments" onClick={handleAssessments}>
          <h3> Today's Assessments</h3>
          <div className="assessmentCard">
            <div className="assessmentColumn">
              {/* DISPLAY NUMBER OF PATIENTS WITHOUT RD NOTE */}
              <div className="initialNumber">{unseenPatients.length}</div>
              <div className="initialDue">Initial Assessments Due</div>
            </div>
            <div className="initialColumn">
              {/* DISPLAY NUMBER OF PATIENTS WITH RD NOTE */}
              <div className="reassessNumber">{seenPatients.length} </div>
              <div className="reassessmentDue">Reassessments Due in 7 Days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
