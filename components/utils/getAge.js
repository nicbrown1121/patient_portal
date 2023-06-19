export function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();

  // Check if the birthday has already occurred this year
  const hasBirthdayOccurred =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  // If the birthday has not occurred, subtract 1 from age
  if (!hasBirthdayOccurred) {
    age--;
  }
  return age;
}
