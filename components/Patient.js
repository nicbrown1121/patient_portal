import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { checkTokenExpiration } from "../pages/auth";
import { formatDate } from "./utils/formatDate";
import { fetchNotesandAssessments } from "./api/api";

function Patient({ id }) {
  const { user, dispatch } = useContext(UserContext);
  const [createModal, setCreateModal] = useState(false);
  const [note, setNote] = useState("");
  const queryClient = useQueryClient();
  let notesObj = {};
  let assessmentObj = {};
  let currPatient = {};

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const allPatients = queryClient.getQueryData(["patient"]);
  if (allPatients !== undefined) {
    currPatient = allPatients.data.find(
      (patient) => patient.id === parseInt(id, 10)
    );
  }

  const bmi =
    (currPatient.weight / (currPatient.height * currPatient.height)) * 703;

  // async function fetchNotes() {
  //   const res = await fetch(`http://localhost:3001/api/patient/${id}/notes`);
  //   console.log("res", res);
  //   if (!res.ok) {
  //     console.log("Failed to fetch notes data");
  //   }
  //   const data = await res.json();
  //   console.log({ data });
  //   return data;
  // }

  // const {
  //   data: notesData,
  //   status: notesStatus,
  //   fetchStatus: notesFetchStatus,
  // } = useQuery({
  //   queryKey: ["notes"],
  //   queryFn: fetchNotes,
  //   cacheTime: "10000",
  // });

  // console.log({ notesData });

  // if (notesStatus === "success") {
  //   notesObj = notesData;
  // }

  // async function fetchAssessments() {
  //   const res = await fetch(
  //     `http://localhost:3001/api/patient/${id}/assessments`
  //   );
  //   console.log("res", res);
  //   if (!res.ok) {
  //     console.log("Failed to fetch assessment data");
  //   }
  //   const data = await res.json();
  //   console.log({ data });
  //   return data;
  // }

  // const {
  //   data: assessmentsData,
  //   status: assessmentsStatus,
  //   fetchStatus: assessmentsFetchStatus,
  // } = useQuery({
  //   queryKey: ["assessments"],
  //   queryFn: fetchAssessments,
  //   cacheTime: "10000",
  // });

  const {
    data: notesAndAssessments,
    isLoading,
    status,
    fetchStatus,
  } = useQuery({
    queryKey: ["notesassessments"],
    queryFn: () => fetchNotesandAssessments(parseInt(id, 10)),
    cacheTime: "10000",
  });

  console.log({ notesAndAssessments });

  if (status === "success") {
    notesObj = notesAndAssessments.notes;
    assessmentObj = notesAndAssessments.assessments;
  }
  const handleCreateNote = () => {
    setCreateModal(!createModal);
  };

  async function createNote() {
    const response = await fetch(`http://localhost:3001/api/patient/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "note",
        text: note,
        username: user.username,
      }),
    });
    if (response.ok) {
      console.log("Note created successfully");
      handleClose();
      queryClient.invalidateQueries(["notesassessments"]); // Invalidate the assessment query to fetch updated data
    } else {
      console.error("Failed to create note.");
    }
  }

  const handleClose = () => {
    setCreateModal(false);
  };

  const handleCreateAssessment = () => {};

  return (
    <div>
      {/* Modal */}
      <Modal
        show={createModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" defaultValue={user.username} disabled />
            </Form.Group>
            <Form.Group controlId="note">
              <Form.Label>Note:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={createNote}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="patientInfo">
        <h1 style={{ textAlign: "center" }}>{currPatient.name}</h1>
      </div>
      <div className="patientPage">
        <div className="notesColumn">
          <div className="patientCards">
            <h2>Assessments</h2>
            <button
              className="assessmentButton"
              onClick={handleCreateAssessment}
            >
              {assessmentObj.length === 0 ? (
                <>Complete Assessment</>
              ) : (
                "Assessment Completed" &&
                Object.values(assessmentObj).map((assessment) => (
                  <tr className="row" key={note.id}>
                    <td>Completed on: {formatDate(assessment.createdAt)}</td>
                    {/* <td>{assessment.text}</td> */}
                  </tr>
                ))
              )}
            </button>
          </div>
          <div className="patientCards" style={{ overflowY: "scroll" }}>
            <h2>Notes</h2>
            <button className="patientButton" onClick={handleCreateNote}>
              Create Note
            </button>
            <table className="patientTable">
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody className="patientList">
                {notesObj &&
                  Object.values(notesObj).map((note) => (
                    <tr className="row" key={note.id}>
                      <td>{formatDate(note.createdAt)}</td>
                      <td>{note.text}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rightColumn">
          <div className="patientCards">
            <h2>Current Admission</h2>
            <ol> Admission Date: {formatDate(currPatient.dateOfAdmission)}</ol>
            <ol> Diagnosis: {currPatient.diagnosis} </ol>
            <ol> Location: {currPatient.location} </ol>
          </div>
          <div className="patientCards">
            <h2>Anthropometrics</h2>
            <ol>Height: {currPatient.height} inches</ol>
            <ol>Weight: {currPatient.weight} lbs</ol>
            <ol> BMI: {bmi.toFixed(2)} </ol>
          </div>
          <div className="patientCards">
            <h2>Dietary </h2>
            <ol>Diet Order: {currPatient.dietOrder} </ol>
            <ol>Fluid Restriction: {currPatient.fluidRestriction} </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;
