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
      <h3
        style={{ fontSize: "30px", paddingTop: "20px", paddingLeft: "160px" }}
      >
        Patient List{" "}
      </h3>
      <Container>
        <Row>
          <Col>
            <div className="patientListContainer">
              {/* <table className="patientTable"> */}
              <Container>
                <Row className="rowHeader">
                  <Col>Patient Name</Col>
                  <Col>DOB</Col>
                  <Col>MRN</Col>
                  <Col>Location</Col>
                  <Col></Col>
                </Row>
              </Container>
              <div className="patientList">
                {patients &&
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
