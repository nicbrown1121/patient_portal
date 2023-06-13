import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "./utils/formatDate";
import { Container, Row, Col } from "react-bootstrap";
// import { checkTokenExpiration } from "../pages/auth";

function AssessmentsPage() {
  const { user, dispatch } = useContext(UserContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  const patients = queryClient.getQueryData(["patient"]);
  let seenPatients = {};
  let unseenPatients = {};

  if (!patients) {
    return <div>Loading...</div>;
  } else if (patients !== undefined) {
    seenPatients = patients.data.filter((patient) => patient.seen);
    unseenPatients = patients.data.filter((patient) => !patient.seen);
  }

  const goToPatient = (patientId) => {
    router.push(`/patient/${patientId}`);
  };

  return (
    <div>
      <h3 style={{ fontSize: "30px" }}>Initial Assessments Due </h3>
      <div className="patientCards">
        <Container>
          <Row className="assessmentHeader" style={{ fontStyle: "bold" }}>
            <Col>Patient Name</Col>
            <Col>DOB</Col>
            <Col>MRN</Col>
            <Col>Location</Col>
          </Row>
          {patients &&
            unseenPatients.map((patient) => (
              <Row className="row" key={patient.id}>
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
          {/* </Row> */}
        </Container>
      </div>
      <h3 style={{ fontSize: "30px" }}>Reassessments Due </h3>
      <div className="patientCard">
        <Container>
          <Row className="patientTable">
            <Col>
              <h6>Patient Name</h6>
            </Col>
            <Col>
              <h6>DOB</h6>
            </Col>
            <Col>
              <h6>MRN</h6>
            </Col>
            <Col>
              <h6>Location</h6>
            </Col>
            {patients &&
              seenPatients.map((patient) => (
                <Row className="row" key={patient.id}>
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
          </Row>
        </Container>
      </div>
    </div>
  );

  // <div>
  //   <h3 style={{ fontSize: "30px" }}>Initial Assessments Due </h3>
  //   <div className="patientCard">
  //     <table className="patientTable">
  //       <thead>
  //         <tr>
  //           <th>Patient Name</th>
  //           <th>DOB</th>
  //           <th>MRN</th>
  //           <th>Location</th>
  //         </tr>
  //       </thead>
  //       <tbody className="patientList">
  //         {patients &&
  //           unseenPatients.map((patient) => (
  //             <tr className="row" key={patient.id}>
  //               <td>{patient.name}</td>
  //               <td>{formatDate(patient.dateOfBirth)}</td>
  //               <td>{patient.id}</td>
  //               <td>{patient.location}</td>
  //               <td>
  //                 <button
  //                   className="patientButton"
  //                   onClick={() => goToPatient(patient.id)}
  //                 >
  //                   Go to Patient
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //       </tbody>
  //     </table>
  //   </div>
  //   <h3 style={{ fontSize: "30px" }}>Reassessments Due </h3>
  //   <div className="patientCard">
  //     <table className="patientTable">
  //       <thead>
  //         <tr>
  //           <th>Patient Name</th>
  //           <th>DOB</th>
  //           <th>MRN</th>
  //           <th>Location</th>
  //         </tr>
  //       </thead>
  //       <tbody className="patientList">
  //         {patients &&
  //           seenPatients.map((patient) => (
  //             <tr className="row" key={patient.id}>
  //               <td>{patient.name}</td>
  //               <td>{formatDate(patient.dateOfBirth)}</td>
  //               <td>{patient.id}</td>
  //               <td>{patient.location}</td>
  //               <td>
  //                 <button
  //                   className="patientButton"
  //                   onClick={() => goToPatient(patient.id)}
  //                 >
  //                   Go to Patient
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //       </tbody>
  //     </table>
  //   </div>
  // </div>
}

export default AssessmentsPage;
