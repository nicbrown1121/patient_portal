import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "./utils/formatDate";
import { Container, Row, Col } from "react-bootstrap";
import {
  getCurrentDate,
  calculateThreeDaysFromReassess,
  isOpenReassessment,
} from "./utils/reassessmentDateCalc";
import { sortPatientsByLocation } from "./utils/sortByLocation";
// import { checkTokenExpiration } from "../pages/auth";

function AssessmentsPage() {
  const { user, dispatch } = useContext(UserContext);
  const queryClient = useQueryClient();
  const router = useRouter();
  const currDate = getCurrentDate();

  const [sortedInitialAssessments, setSortedInitialAssessments] = useState([]);
  const [initialSortAscending, setInitialSortAscending] = useState(true);
  const [reassessmentSortAscending, setReassessmentSortAscending] =
    useState(true);
  const [completedSortAscending, setCompletedSortAscending] = useState(true);

  const patients = queryClient.getQueryData(["patient"]);
  let seenPatients = {};
  let unseenPatients = {};
  let reassessmentInThreeDays = {};

  if (!patients) {
    return <div>Loading...</div>;
  } else if (patients !== undefined) {
    seenPatients = patients.data.filter((patient) => patient.seen);
    unseenPatients = patients.data.filter((patient) => !patient.seen);
  }

  if (seenPatients.length > 0) {
    reassessmentInThreeDays = seenPatients.filter((patient) => {
      const threeDaysFromReassess = calculateThreeDaysFromReassess(
        patient.reassessmentDate
      );
      let openReassessment = isOpenReassessment(
        formatDate(currDate),
        formatDate(threeDaysFromReassess),
        formatDate(patient.reassessmentDate)
      );
      return openReassessment;
    });
  }

  const [sortedCompletedAssessments, setSortedCompletedAssessments] =
    useState(seenPatients);
  const [sortedReassessments, setSortedReassessments] = useState(
    reassessmentInThreeDays
  );

  const handleSortByLocation = (container) => {
    if (container === "initialAssessments") {
      const sortedArray = sortPatientsByLocation(
        unseenPatients,
        initialSortAscending
      );
      setSortedInitialAssessments(sortedArray);
      setInitialSortAscending(!initialSortAscending);
    } else if (container === "reassessments") {
      const sortedArray = sortPatientsByLocation(
        reassessmentInThreeDays,
        reassessmentSortAscending
      );
      setSortedReassessments(sortedArray);
      setReassessmentSortAscending(!reassessmentSortAscending);
    } else if (container === "completedAssessments") {
      const sortedArray = sortPatientsByLocation(
        seenPatients,
        completedSortAscending
      );
      setSortedCompletedAssessments(sortedArray);
      setCompletedSortAscending(!completedSortAscending);
    }
  };

  const goToPatient = (patientId) => {
    router.push(`/patient/${patientId}`);
  };

  return (
    <div>
      <h3 style={{ fontSize: "30px", paddingTop: "30px", paddingLeft: "80px" }}>
        Initial Assessments Due{" "}
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="patientCard">
          <Container>
            <Row className="rowHeader">
              <Col>Patient Name</Col>
              <Col>DOB</Col>
              <Col>MRN</Col>
              <Col
                onClick={() => handleSortByLocation("initialAssessments")}
                style={{ cursor: "pointer" }}
              >
                Location <span>{initialSortAscending ? "▲" : "▼"}</span>
              </Col>
              <Col></Col>
            </Row>
            {sortedInitialAssessments.length > 0
              ? sortedInitialAssessments.map((patient) => (
                  <Row
                    className="row"
                    style={{ padding: "0.5rem" }}
                    key={patient.id}
                  >
                    <Col>{patient.name}</Col>
                    <Col>{formatDate(patient.dateOfBirth)}</Col>
                    <Col>{patient.id}</Col>
                    <Col>{patient.location}</Col>
                    <Col>
                      <button
                        className="patientButton"
                        onClick={() => goToPatient(patient.id)}
                      >
                        Go to Patient
                      </button>
                    </Col>
                  </Row>
                ))
              : unseenPatients &&
                unseenPatients.map((patient) => (
                  <Row
                    className="row"
                    style={{ padding: "0.5rem" }}
                    key={patient.id}
                  >
                    <Col>{patient.name}</Col>
                    <Col>{formatDate(patient.dateOfBirth)}</Col>
                    <Col>{patient.id}</Col>
                    <Col>{patient.location}</Col>
                    <Col>
                      <button
                        className="patientButton"
                        onClick={() => goToPatient(patient.id)}
                      >
                        Go to Patient
                      </button>
                    </Col>
                  </Row>
                ))}
          </Container>
        </div>
      </div>
      <h3 style={{ fontSize: "30px", paddingTop: "25px", paddingLeft: "80px" }}>
        Reassessments Due
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="patientCard">
          <Container>
            <Row className="rowHeader">
              <Col>Patient Name</Col>
              <Col>DOB</Col>
              <Col>MRN</Col>
              <Col
                onClick={() => handleSortByLocation("reassessments")}
                style={{ cursor: "pointer" }}
              >
                Location <span>{reassessmentSortAscending ? "▲" : "▼"}</span>
              </Col>
              <Col></Col>
            </Row>
            {sortedReassessments.length > 0 &&
              sortedReassessments.map((patient) => (
                <Row
                  className="row"
                  style={{ padding: "0.5rem" }}
                  key={patient.id}
                >
                  <Col>{patient.name}</Col>
                  <Col>{formatDate(patient.dateOfBirth)}</Col>
                  <Col>{patient.id}</Col>
                  <Col>{patient.location}</Col>
                  <Col>
                    <button
                      className="patientButton"
                      onClick={() => goToPatient(patient.id)}
                    >
                      Go to Patient
                    </button>
                  </Col>
                </Row>
              ))}
          </Container>
        </div>
      </div>
      <h3
        style={{
          fontSize: "30px",
          paddingTop: "40px",
          paddingLeft: "80px",
          color: "#999999",
        }}
      >
        Assessments Completed
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="patientCard">
          <Container>
            <Row className="rowHeader">
              <Col>Patient Name</Col>
              <Col>DOB</Col>
              <Col>MRN</Col>
              <Col
                onClick={() => handleSortByLocation("completedAssessments")}
                style={{ cursor: "pointer" }}
              >
                Location <span>{completedSortAscending ? "▲" : "▼"}</span>
              </Col>
              <Col></Col>
            </Row>
            {sortedCompletedAssessments &&
              sortedCompletedAssessments.map((patient) => (
                <Row
                  className="row"
                  style={{ padding: "0.5rem" }}
                  key={patient.id}
                >
                  <Col>{patient.name}</Col>
                  <Col>{formatDate(patient.dateOfBirth)}</Col>
                  <Col>{patient.id}</Col>
                  <Col>{patient.location}</Col>
                  <Col>
                    <button
                      className="patientButton"
                      onClick={() => goToPatient(patient.id)}
                    >
                      Go to Patient
                    </button>
                  </Col>
                </Row>
              ))}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default AssessmentsPage;
