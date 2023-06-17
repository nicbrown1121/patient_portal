import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { checkTokenExpiration } from "../pages/auth";
import { formatDate } from "./utils/formatDate";
import { fetchNotesandAssessments } from "./api/api";
import { initialAssessmentState } from "./utils/initialStates";
import {
  frameSizeOptions,
  weightTrendOptions,
  acutePOIntakeOptions,
  muscleMassOptions,
  fatMassOptions,
  hospitalizedLast30DaysOptions,
} from "./utils/assessmentOptions";
import {
  getCurrentDate,
  calculateReassessmentDate,
  calculateThreeDaysFromReassess,
  isOpenReassessment,
} from "./utils/reassessmentDateCalc";

function Patient({ id }) {
  const { user, dispatch } = useContext(UserContext);
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [createAssessmentModal, setCreateAssessmentModal] = useState(false);
  const [note, setNote] = useState("");
  const queryClient = useQueryClient();
  const [createAssessmentState, setCreateAssessmentState] = useState(
    initialAssessmentState
  );
  const [editDiet, setEditDiet] = useState(false);

  let notesObj = {};
  let assessmentObj = {};
  let currPatient = {};
  const currDate = getCurrentDate();

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const allPatients = queryClient.getQueryData(["patient"]);
  if (allPatients !== undefined) {
    currPatient = allPatients.data.find(
      (patient) => patient.id === parseInt(id, 10)
    );
  }

  const [editDietState, setEditDietState] = useState(currPatient);
  console.log({ editDietState });

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
    cacheTime: "1000000",
  });

  if (status === "success") {
    notesObj = notesAndAssessments.notes;
    assessmentObj = notesAndAssessments.assessments;
  }
  let reassessmentDate = calculateReassessmentDate(assessmentObj);
  const threeDaysFromReassess =
    calculateThreeDaysFromReassess(reassessmentDate);
  let openReassessment = isOpenReassessment(
    currDate,
    threeDaysFromReassess,
    reassessmentDate
  );

  console.log({ reassessmentDate, threeDaysFromReassess, openReassessment });

  const handleCreateNote = () => {
    setCreateNoteModal(!createNoteModal);
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

  async function createAssessment() {
    console.log("in create assessment");
    const requestBody = { ...createAssessmentState };
    const response = await fetch(`http://localhost:3001/api/patient/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "assessment",
        completed: true,
        username: user.username,
        requestBody,
      }),
    });
    if (response.ok) {
      console.log("Assessment created successfully");
      handleClose();
      queryClient.invalidateQueries(["notesassessments"]); // Invalidate the assessment query to fetch updated data
    } else {
      console.error("Failed to create assessment.");
    }
  }

  const handleClose = () => {
    setCreateNoteModal(false);
    setCreateAssessmentModal(false);
  };

  const handleCreateAssessment = () => {
    setCreateAssessmentModal(!createAssessmentModal);
  };

  const handleDietModal = () => {
    setEditDiet(!editDiet);
  };

  const handleDietInputChange = (value) => {
    console.log("IN HANDLE DIET CHANGE", { value });
    console.log("editDietState", editPositionState);
    // editDietState ({
    //   ...currPatient,
    //   dietOrder,
    //   fluidRestriction
    // })
  };

  async function editPatientDiet() {
    console.log("editDietState in EDITDIET FUNC", editDietState);
    setEditDiet(!editDiet);

    // const requestBody ={
    //   ...currPatient,

    // }
  }

  return (
    <div>
      {/* Note Modal */}
      <Modal
        show={createNoteModal}
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
      {/* Assessment Modal */}
      <Modal
        show={createAssessmentModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation={false}
        className="modalStyle"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="formStyle">
            <Form.Group>
              <Form.Label disabled style={{ fontStyle: "bold" }}>
                Patient: {currPatient.name}{" "}
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label disabled>User: {user.username} </Form.Label>
            </Form.Group>

            <Form.Group name="frameSize">
              <Form.Label>Frame Size: </Form.Label>
              <select
                value={createAssessmentState.frameSize}
                onChange={(e) =>
                  setCreateAssessmentState({
                    ...createAssessmentState,
                    frameSize: e.target.value,
                  })
                }
              >
                <option value="">Select an option</option>
                {frameSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group name="weightTrend">
              <Form.Label>Weight Trend: </Form.Label>
              <select
                value={createAssessmentState.weightTrend}
                onChange={(e) =>
                  setCreateAssessmentState({
                    ...createAssessmentState,
                    weightTrend: e.target.value,
                  })
                }
              >
                <option value="">Select an option</option>
                {weightTrendOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group name="POIntake">
              <Form.Label>Recent PO Intake: </Form.Label>
              <select
                value={createAssessmentState.acutePOIntake}
                onChange={(e) =>
                  setCreateAssessmentState({
                    ...createAssessmentState,
                    acutePOIntake: e.target.value,
                  })
                }
              >
                <option value="">Select an option</option>
                {acutePOIntakeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group name="muscleMass">
              <Form.Label>Muscle Mass: </Form.Label>
              <select
                value={createAssessmentState.muscleMass}
                onChange={(e) =>
                  setCreateAssessmentState({
                    ...createAssessmentState,
                    muscleMass: e.target.value,
                  })
                }
              >
                <option value="">Select an option</option>
                {muscleMassOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group name="fatMass">
              <Form.Label>Fat Mass: </Form.Label>
              <select
                value={createAssessmentState.fatMass}
                onChange={(e) =>
                  setCreateAssessmentState({
                    ...createAssessmentState,
                    fatMass: e.target.value,
                  })
                }
              >
                <option value="">Select an option</option>
                {fatMassOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group name="fatMass">
              <Form.Label>Hospitalized within Last 30 Days: </Form.Label>
              <select
                value={createAssessmentState.hospitalizedLast30Days}
                onChange={(e) =>
                  setCreateAssessmentState({
                    ...createAssessmentState,
                    hospitalizedLast30Days: e.target.value,
                  })
                }
              >
                <option value="">Select an option</option>
                {hospitalizedLast30DaysOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group name="skinIntegrity">
              <Form.Label>Skin Integity: </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={createAssessmentState.skinIntegrity}
                onChange={(e) =>
                  setCreateAssessmentState({
                    ...createAssessmentState,
                    skinIntegrity: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group name="comment">
              <Form.Label>Comment: </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={createAssessmentState.comment}
                onChange={(e) =>
                  setCreateAssessmentState({
                    ...createAssessmentState,
                    comment: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group name="recommendation">
              <Form.Label>Recommendations: </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={createAssessmentState.recommendations}
                onChange={(e) =>
                  setCreateAssessmentState({
                    ...createAssessmentState,
                    recommendations: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={createAssessment}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="patientInfo">
        <h1 style={{ textAlign: "center", padding: "1.25rem" }}>
          {currPatient.name}
        </h1>
      </div>
      <div className="patientPage">
        <div className="notesColumn">
          <div className="assessments">
            <h2>Assessments</h2>
            {assessmentObj && assessmentObj.length === 0 ? (
              <button
                className="assessmentButton"
                onClick={handleCreateAssessment}
              >
                Complete Assessment
              </button>
            ) : (
              <>
                {Object.values(assessmentObj).map((assessment) => (
                  <div className="row" key={assessment.id}>
                    <div style={{ color: "#999999" }}>
                      Completed On: {formatDate(assessment.createdAt)}
                    </div>
                  </div>
                ))}
                <div>
                  <div className="reassessmentDueDate">
                    Reassessment Due: {formatDate(reassessmentDate)}
                  </div>
                  <div>
                    {openReassessment && (
                      <button
                        className="reassessmentButton"
                        onClick={handleCreateAssessment}
                      >
                        Open Reassessment
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="assessments" style={{ overflowY: "scroll" }}>
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
            <div>
              <h2>Dietary </h2>
              <button className="patientButton" onClick={handleDietModal}>
                Edit
              </button>
            </div>
            {editDiet ? (
              <>
                <Form>
                  <Form.Group className="d-inline-flex">
                    <Form.Label
                      style={{ whiteSpace: "nowrap", padding: "0.5rem" }}
                    >
                      Diet Order:
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      defaultValue={currPatient.dietOrder}
                      sm={9}
                      style={{ justifyContent: "right" }}
                      // value={editDietState.dietOrder}
                      // onChange={handleDietInputChange}
                      onChange={(e) =>
                        setEditDietState({
                          ...currPatient,
                          dietOrder: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <div>
                    <Form.Group className="d-inline-flex">
                      <Form.Label
                        style={{ whiteSpace: "nowrap", padding: "0.5rem" }}
                      >
                        Fluid Restriction:
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        defaultValue={currPatient.fluidRestriction}
                        sm={9}
                        // value={editDietState.fluidRestriction}
                        // onChange={handleDietInputChange}
                        onChange={(e) =>
                          setEditDietState({
                            ...currPatient,
                            fluidRestriction: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                </Form>
                <Button variant="primary" onClick={editPatientDiet}>
                  Submit Changes
                </Button>
                <Button variant="secondary" onClick={handleDietModal}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <ol>Diet Order: {currPatient.dietOrder} </ol>
                <ol>Fluid Restriction: {currPatient.fluidRestriction} </ol>
                {assessmentObj.length >= 1 && (
                  <ol>
                    Dietitian Recommendations:
                    <ol style={{ fontStyle: "italic" }}>
                      {assessmentObj.map(
                        (assessment) => assessment.recommendations
                      )}
                    </ol>
                  </ol>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;
