import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkTokenExpiration } from "../pages/auth";
import { formatDate } from "./utils/formatDate";
import { Container, Row, Col } from "react-bootstrap";

function PatientFunc() {
  const { user, dispatch } = useContext(UserContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const patients = queryClient.getQueryData(["patient"]);

  const handleAssessment = (patientId) => {
    router.push(`/patient/${patientId}`);
  };

  return (
    <div>
      <h3 style={{ fontSize: "30px" }}>Patient List </h3>
      <Container>
        <Row>
          <Col>
            <div className="patientCard">
              <table className="patientTable">
                <Container>
                  <Row style={{ fontSize: "15px" }}>
                    <Col>Patient Name</Col>
                    <Col>DOB</Col>
                    <Col>MRN</Col>
                    <Col>Location</Col>
                  </Row>
                </Container>
                <tbody className="patientList">
                  {patients &&
                    patients.data.map((patient) => (
                      <Row className="row" key={patient.id}>
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
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PatientFunc;
