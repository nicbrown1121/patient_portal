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
import PatientButton from "./PatientButton";
// import { checkTokenExpiration } from "../pages/auth";

function AssessmentsPage() {
  const { user, dispatch } = useContext(UserContext);
  const queryClient = useQueryClient();
  const router = useRouter();
  const currDate = getCurrentDate();
  const [sortedPatients, setSortedPatients] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

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

  console.log({ unseenPatients });

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

  console.log({ reassessmentInThreeDays });

  const handleSortByLocation = () => {
    const sortedArray = sortPatientsByLocation(unseenPatients, sortAscending);
    setSortedPatients(sortedArray);
    setSortAscending(!sortAscending);
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
              <Col onClick={handleSortByLocation} style={{ cursor: "pointer" }}>
                Location <span>{sortAscending ? "▲" : "▼"}</span>
              </Col>
              <Col></Col>
            </Row>
            {sortedPatients.length > 0
              ? sortedPatients.map((patient) => (
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
                      <PatientButton />
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
                      <PatientButton />
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
              <Col>Location</Col>
              <Col></Col>
            </Row>
            {reassessmentInThreeDays.length > 0 &&
              reassessmentInThreeDays.map((patient) => (
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
                    <PatientButton />
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
              <Col>Location</Col>
              <Col></Col>
            </Row>
            {seenPatients &&
              seenPatients.map((patient) => (
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
                    <PatientButton />
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
