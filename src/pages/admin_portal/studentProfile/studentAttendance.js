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

  const fetchAttendanceData = () => {
    const studentRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/attendance`
    );
    get(studentRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data) {
            const attendanceArray = Object.values(data);
            setAttendanceData(attendanceArray);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching attendance data:");
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

  // Function to split the attendance data into groups of 5
  const splitAttendanceIntoGroups = (data, groupSize) => {
    const groupedData = [];
    for (let i = 0; i < data.length; i += groupSize) {
      groupedData.push(data.slice(i, i + groupSize));
    }
    return groupedData;
  };

  const groupedAttendanceData = splitAttendanceIntoGroups(attendanceData, 5);

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
            <div className={styles.attendanceHeader}>
              <h1>Students Attendance Page - Term one</h1>
            </div>

            <div className={styles.attendanceTable}>
              <table>
                <tr>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                </tr>
                {groupedAttendanceData.map((group, rowIndex) => (
                  <tr key={rowIndex}>
                    {group.map((attendance, index) => (
                      <td
                        key={index}
                      >{`${attendance.status}, ${attendance?.day || "No day"} - ${attendance.date}`}</td>
                    ))}
                  </tr>
                ))}
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
