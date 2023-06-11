import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { checkTokenExpiration } from "../pages/auth";
import { formatDate } from "./utils/formatDate";

function Patient({ id }) {
  const { user, dispatch } = useContext(UserContext);
  const [createModal, setCreateModal] = useState(false);
  const [note, setNote] = useState("");
  const queryClient = useQueryClient();
  let notesObj = {};

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const currPatient = queryClient
    .getQueryData(["patient"])
    .data.find((patient) => patient.id === parseInt(id, 10));

  console.log("currPatient", currPatient);

  const bmi =
    (currPatient.weight / (currPatient.height * currPatient.height)) * 703;

  async function fetchNotesandAssessments() {
    const res = await fetch(
      `http://localhost:3001/api/patient/${currPatient.id}`
    );
    console.log("res", res);
    if (!res.ok) {
      console.log("Failed to fetch assessment data");
    }
    const data = await res.json();
    console.log({ data });
    return data;
  }

  const {
    data: notesAndAssessments,
    isLoading,
    status,
    fetchStatus,
  } = useQuery({
    queryKey: ["assessment"],
    queryFn: fetchNotesandAssessments,
    cacheTime: "10000",
  });

  if (status === "success") {
    notesObj = notesAndAssessments.notes;
  }

  const handleCreateNote = () => {
    setCreateModal(!createModal);
  };

  const createNote = async () => {
    // const username = user.username;
    // const requestBody = { username, note };
    // try {
    //   // Send the POST request to the server
    //   const response = await fetch("http://localhost:3001/api/patient", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(requestBody),
    //   });
    //   // Handle HTTP response
    //   if (response.ok) {
    //     console.log("Note created successfully!");
    //     // Reset the modal fields and close the modal
    //     handleClose();
    //   } else {
    //     console.error("Failed to create note.");
    //   }
    // } catch (error) {
    //   console.error("An error occurred while creating the note:", error);
    //}
  };

  const handleClose = () => {
    setCreateModal(false);
  };

  // function formatDate(date) {
  //   const formattedDate = new Date(date).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   });

  //   return formattedDate;
  // }

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
              <Form.Control type="text" value={user.username} />
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
              Create Assessment
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
