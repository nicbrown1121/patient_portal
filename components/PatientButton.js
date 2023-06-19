"use-client";
const PatientButton = () => {
  const goToPatient = (patientId) => {
    router.push(`/patient/${patientId}`);
  };
  return (
    <button className="patientButton" onClick={() => goToPatient(patient.id)}>
      Go to Patient
    </button>
  );
};

export default PatientButton;
