import React, { useState, useEffect } from "react";
import styles from "@/styles/parent_portal_css/attendance.module.css";

function StudentAttendance({ attendanceOfVerifiedStudent }) {
  const [attendanceData, setAttendanceData] = useState({});
  const [term, setTerm] = useState("Term One");

  useEffect(() => {
    if (attendanceOfVerifiedStudent) {
      // Set the attendance data for the selected term
      setAttendanceData(attendanceOfVerifiedStudent);
    }
  }, [attendanceOfVerifiedStudent]);

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  // Helper function to get the abbreviated status
  const getAbbreviatedStatus = (status) => {
    switch (status) {
      case "Present":
        return "P";
      case "Absent":
        return "A";
      default:
        return "";
    }
  };

  const renderAttendanceByDay = (day) => {
    if (!attendanceData[term]) return null;

    const dayAttendance = Object.values(attendanceData[term]).filter(
      (record) => record.day === day
    );

    return dayAttendance.map((record, index) => (
      <div key={index}>{`${getAbbreviatedStatus(record.status)} = ${record.date}`}</div>
    ));
  };

  return (
    <>
      <div className={styles.attendanceContainer}>
        <div className={styles.attendanceItems}>
          <div className={styles.termSelection}>
            <label>Select Term:</label>
            <select value={term} onChange={handleTermChange}>
              <option value="Term One">Term 1</option>
              <option value="Term Two" disabled>
                Term 2
              </option>
              <option value="Term Three" disabled>
                Term 3
              </option>
            </select>
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

        <div className={styles.addBtn}>
          <input type="date" placeholder="date" />
        </div>
      </div>
    </>
  );
}

export default StudentAttendance;
