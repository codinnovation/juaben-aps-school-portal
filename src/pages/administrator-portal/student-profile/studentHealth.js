import React from "react";
import styles from "../../../styles/admin_portal_css/studentHealthInfo.module.css";
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
  const navigateToStudentGuardian = () => {
    navigateToComp("studentGuardian");
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
                <button onClick={navigateToStudentGuardian}>
                  Student Guardian
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
                <button onClick={navigateToStudentHomework}>Home work </button>
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
              <label>NHIS Number</label>
              <h1>{selectedStudent?.NHISno || "No NHIS number"}</h1>
            </div>

            <div className={styles.fields}>
              <label>NHIS Name</label>
              <h1>{selectedStudent?.NHISName || "No NHIS Name"}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentFees;
