import React, { useState, useEffect } from "react";
import styles from "@/styles/admin_portal_css/studentAttendance.module.css";
import { ref, get } from "firebase/database";
import { db } from "../../../lib/firebase";

function StudentAttendance({ selectedStudent }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [term, setTerm] = useState("Term One");

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
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
    fetchAttendanceData()
  }, [, selectedStudent.key])




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
      <div className={styles.attendanceContainer}>
        <div className={styles.attendanceBody}>
          <div className={styles.termSelection}>
            <label>Select Term:</label>
            <select value={term} onChange={handleTermChange}>
              <option value=""></option>
              <option value="Term One">Term One</option>
              <option value="Term Two" disabled>
                Term 2
              </option>
              <option value="Term Three" disabled>
                Term 3
              </option>
            </select>
          </div>
          <div className={styles.attendanceHeader}>
            <h1>Student&apos;s Attendance</h1>
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
      </div>
    </>
  );
}

export default StudentAttendance;
