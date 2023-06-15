export function getCurrentDate() {
  return new Date();
}

export function calculateReassessmentDate(assessmentObj) {
  if (assessmentObj.length >= 1 && assessmentObj !== undefined) {
    const lastAssessment = assessmentObj[assessmentObj.length - 1];
    const lastAssessmentDate = new Date(lastAssessment.createdAt);
    const reassessmentDate = new Date(lastAssessmentDate);
    reassessmentDate.setMonth(lastAssessmentDate.getMonth() + 1);
    return reassessmentDate;
  }
  return null;
}

export function calculateSevenDaysFromReassess(reassessmentDate) {
  if (reassessmentDate) {
    const sevenDaysFromReassess = new Date(reassessmentDate);
    sevenDaysFromReassess.setDate(sevenDaysFromReassess.getDate() - 7);
    sevenDaysFromReassess.setMonth(sevenDaysFromReassess.getMonth());
    console.log("calc func", { sevenDaysFromReassess });
    return sevenDaysFromReassess;
  }
  return null;
}

export function isOpenReassessment(
  currDate,
  sevenDaysFromReassess,
  reassessmentDate
) {
  if (currDate && sevenDaysFromReassess && reassessmentDate) {
    return currDate >= sevenDaysFromReassess && currDate <= reassessmentDate;
  }
  return false;
}
