import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

//check if the user is logged in whenever user changes.
// If they aren't logged in, navigate to the login page.
export default function HomePage() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  // const [unseenPatients, setUnseenPatients] = useState([]);

  async function fetchPatients() {
    const res = await fetch("http://localhost:3001/patient", {
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

  // console.log("seenPatientData from react query", seenPatientData);

  let seenPatients = {};
  let unseenPatients = {};

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (patientData !== undefined && status === "success") {
    console.log("patientData", patientData);
    seenPatients = patientData.data.filter((patient) => patient.seen);
    unseenPatients = patientData.data.filter((patient) => !patient.seen);
  }

  console.log({ seenPatients, unseenPatients });

  const handleAssessments = () => {
    router.push("/assessments");
  };

  if (!user.isLoggedIn) {
    router.push("/login");
  } else {
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
                <div className="reassessmentDue">
                  Reassessments Due in 7 Days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
