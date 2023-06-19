import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkTokenExpiration } from "../pages/auth";
import { formatDate } from "./utils/formatDate";
import { Container, Row, Col } from "react-bootstrap";
import { sortPatientsByLocation } from "./utils/sortByLocation";

function PatientFunc() {
  const { user, dispatch } = useContext(UserContext);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [sortedPatients, setSortedPatients] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const patients = queryClient.getQueryData(["patient"]);

  const handleSortByLocation = () => {
    const sortedArray = sortPatientsByLocation(patients.data, sortAscending);
    setSortedPatients(sortedArray);
    setSortAscending(!sortAscending);
  };

  const handleAssessment = (patientId) => {
    router.push(`/patient/${patientId}`);
  };

  return (
    <div>
      <h3
        style={{ fontSize: "30px", paddingTop: "20px", paddingLeft: "160px" }}
      >
        Patient List{" "}
      </h3>
      <Container>
        <Row>
          <Col>
            <div className="patientListContainer">
              <Container>
                <Row className="rowHeader">
                  <Col>Patient Name</Col>
                  <Col>DOB</Col>
                  <Col>MRN</Col>
                  <Col
                    onClick={handleSortByLocation}
                    style={{ cursor: "pointer" }}
                  >
                    Location <span>{sortAscending ? "▲" : "▼"}</span>
                  </Col>
                  <Col></Col>
                </Row>
              </Container>
              <div className="patientList">
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
                          <button
                            className="patientButton"
                            onClick={() => handleAssessment(patient.id)}
                          >
                            Go to Patient
                          </button>
                        </Col>
                      </Row>
                    ))
                  : patients &&
                    patients.data.map((patient) => (
                      <Row
                        className="row"
                        style={{
                          justifyContent: "center",
                        }}
                        key={patient.id}
                      >
                        <Col>{patient.name}</Col>
                        <Col>{formatDate(patient.dateOfBirth)}</Col>
                        <Col>{patient.id}</Col>
                        <Col>{patient.location}</Col>
                        <Col>
                          <button
                            className="patientButton"
                            onClick={() => handleAssessment(patient.id)}
                          >
                            Go to Patient
                          </button>
                        </Col>
                      </Row>
                    ))}
              </div>
              {/* </table> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PatientFunc;
