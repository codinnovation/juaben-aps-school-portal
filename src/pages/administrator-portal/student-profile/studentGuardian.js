import React from "react";
import styles from "../../../styles/admin_portal_css/studentGuadian.module.css";
import Image from "next/image";

function StudentFees({
  hideStudentProfilePage,
  navigateToComp,
  selectedStudent,
}) {
  const navigateToStudentProfilePage = () => {
    navigateToComp("studentProfile");
  };

  const navigateToStudentFees = () => {
    navigateToComp("studentFees");
  };

  const navigateToStudentAttendance = () => {
    navigateToComp("studentAttendance");
  };

  const navigateToStudentClassScore = () => {
    navigateToComp("studentClassScore");
  };

  const navigateToStudentHealth = () => {
    navigateToComp("studentHealth");
  };

  const navigateToStudentClassTest = () => {
    navigateToComp("studentClassTest");
  };
  const navigateToStudentHomework = () => {
    navigateToComp("studentHomework");
  };

  return (
    <>
      <div className={styles.studentProfilePageContainer}>
        <div className={styles.navigationContainer}>
          <div className={styles.studentPhoto}>
            <Image
              src="/student5651.jpg"
              width={200}
              height={150}
              alt="student_image"
            />
          </div>
          <div className={styles.stundentName}>
            <h1>{`${selectedStudent?.FirstName || ""} ${
              selectedStudent?.MiddleName || ""
            } ${selectedStudent?.LastName || ""} `}</h1>
          </div>

          <div className={styles.studentNavLinks}>
            <ul>
              <li>
                <button onClick={navigateToStudentProfilePage}>
                  Student Profile
                </button>
              </li>
              <li>
                <button onClick={navigateToStudentHealth}>
                  Student Health
                </button>
              </li>
              <li>
                <button onClick={navigateToStudentAttendance}>
                  Attendance
                </button>
              </li>

              <li>
                <button onClick={navigateToStudentFees}>Fees</button>
              </li>

              <li>
                <button onClick={navigateToStudentClassScore}>
                  Class Scores
                </button>
              </li>

              <li>
                <button onClick={navigateToStudentClassTest}>Class Test</button>
              </li>

              <li>
                <button onClick={navigateToStudentHomework}>Home work</button>
              </li>
            </ul>
          </div>

          <div className={styles.backToList}>
            <button onClick={hideStudentProfilePage}>Back To List</button>
          </div>
        </div>

        <div className={styles.studentProfileDetailsContainer}>
          <div className={styles.studentProfileFields}>
            <div className={styles.fields}>
              <label>Guardian&apos;s Name</label>
              <h1>{selectedStudent?.guardianName || "No first name"}</h1>
            </div>

            <div className={styles.fields}>
              <label>Guardian&apos;s Residence</label>
              <h1>{selectedStudent?.guardianResidence || "No Residence"}</h1>
            </div>

            <div className={styles.fields}>
              <label>Guardian&apos;s Phone</label>
              <h1>{selectedStudent?.guardianPhone || "No Phone"}</h1>
            </div>

            <div className={styles.fields}>
              <label>Guardian&apos;s Other Phone</label>
              <h1>{selectedStudent?.guardianOtherPhone || "No Other Phone"}</h1>
            </div>

            <div className={styles.fields}>
              <label>Student&apos;s Religion</label>
              <h1>{selectedStudent?.Religion || "No Religion"}</h1>
            </div>
          </div>

          {/* <div className={styles.buttons}>
            <button onClick={showUpdateForm}>Edit Student</button>
            <button>Remove Student</button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default StudentFees;
