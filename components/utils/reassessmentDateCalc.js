export function getCurrentDate() {
  return new Date();
}

export function calculateReassessmentDate(assessmentObj) {
  if (assessmentObj.length >= 1 && assessmentObj !== undefined) {
    const lastAssessment = assessmentObj[assessmentObj.length - 1];
    const lastAssessmentDate = new Date(lastAssessment.createdAt);
    const reassessmentDate = new Date(lastAssessmentDate);
    reassessmentDate.setDate(lastAssessmentDate.getDate() + 7);
    return reassessmentDate;
  }
  return null;
}

export function calculateThreeDaysFromReassess(reassessmentDate) {
  if (reassessmentDate) {
    const threeDaysFromReassess = new Date(reassessmentDate);
    threeDaysFromReassess.setDate(threeDaysFromReassess.getDate() - 3);
    console.log("three days from reassess", { threeDaysFromReassess });
    return threeDaysFromReassess;
  }
  return null;
}

export function isOpenReassessment(
  currDate,
  threeDaysFromReassess,
  reassessmentDate
) {
  if (currDate && threeDaysFromReassess && reassessmentDate) {
    return currDate >= threeDaysFromReassess && currDate <= reassessmentDate;
  }
  return false;
}
