import React, { useState, useEffect } from "react";
import styles from "@/styles/admin_portal_css/studentAttendance.module.css";
import Image from "next/image";
import { ref, get } from "firebase/database";
import { db } from "../../../lib/firebase";

function StudentAttendance({
  hideStudentProfilePage,
  navigateToComp,
  selectedStudent,
}) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [term, setTerm] = useState("Term One");

  
  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };


  const fetchAttendanceData = () => {
    const studentRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/attendance`
    );
    get(studentRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setAttendanceData(data || {});
        }
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  };

  // Use useEffect to fetch attendance data on component load
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const navigateToStudentProfilePage = () => {
    navigateToComp("studentProfile");
  };

  const navigateToStudentGuardian = () => {
    navigateToComp("studentGuardian");
  };

  const navigateToStudentFees = () => {
    navigateToComp("studentFees");
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

  
  const renderAttendanceByDay = (day) => {
    if (!attendanceData[term]) return null;

    const dayAttendance = Object.values(attendanceData[term]).filter(
      (record) => record.day === day
    );

    return dayAttendance.map((record, index) => (
      <div key={index}>{`${record.status} - ${record.date}`}</div>
    ));
  };

  return (
    <>
      <div className={styles.studentProfilePageContainer}>
        <div className={styles.firstBox}>
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
              selectedStudent?.LastName || ""
            }`}</h1>
          </div>

          <div className={styles.studentNavLinks}>
            <ul>
              <li>
                <button onClick={navigateToStudentProfilePage}>
                  Profile page
                </button>
              </li>

              <li>
                <button onClick={navigateToStudentHealth}>
                  Student Health
                </button>
              </li>

              <li>
                <button onClick={navigateToStudentGuardian}>
                  Student Guardian
                </button>
              </li>

              <li>
                <button onClick={navigateToStudentFees}>Fees</button>
              </li>

              <li>
                <button onClick={navigateToStudentClassScore}>
                  Class Score
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

        <div className={styles.attendanceContainer}>
          <div className={styles.attendanceBody}>
          <div className={styles.termSelection}>
            <label>Select Term:</label>
            <select value={term} onChange={handleTermChange}>
              <option value=""></option>
              <option value="Term One">Term 1</option>
              <option value="Term Two" disabled>Term 2</option>
              <option value="Term Three" disabled>Term 3</option>
            </select>
          </div>
            <div className={styles.attendanceHeader}>
              <h1>Students Attendance Page - Term one</h1>
            </div>
            <div className={styles.attendanceTable}>
            <table>
              <thead>
                <tr>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{renderAttendanceByDay("Monday")}</td>
                  <td>{renderAttendanceByDay("Tuesday")}</td>
                  <td>{renderAttendanceByDay("Wednesday")}</td>
                  <td>{renderAttendanceByDay("Thursday")}</td>
                  <td>{renderAttendanceByDay("Friday")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          <div className={styles.chooseDateContainer}>
            <input type="date" />
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentAttendance;
