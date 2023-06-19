export function sortPatientsByLocation(patients, sortAscending) {
  console.log("in sortfunction", { patients });
  const patientArray = Object.values(patients);

  const filteredArray = patientArray.filter((patient) => patient.location);
  const sortedArray = [...filteredArray].sort((a, b) => {
    const locationA = a.location.toLowerCase();
    const locationB = b.location.toLowerCase();
    let comparison = 0;
    if (locationA > locationB) {
      comparison = 1;
    } else if (locationA < locationB) {
      comparison = -1;
    }
    return sortAscending ? comparison : -comparison;
  });
  return sortedArray;
}
