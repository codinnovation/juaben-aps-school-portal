import React, { useState, useEffect } from "react";
import styles from "@/styles/parent_portal_css/attendance.module.css";

function StudentAttendance({ varifiedStudent }) {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    if (varifiedStudent?.length && varifiedStudent[0].attendance) {
      setAttendanceData(varifiedStudent[0].attendance);
    }
  }, [varifiedStudent]);

  return (
    <>
      <div className={styles.attendanceContainer}>
        <div className={styles.attendanceItems}>
          <div className={styles.attendanceTable}>
            <div className={styles.attendanceHeader}>
              <h1>Monday</h1>
              <h1>Tuesday</h1>
              <h1>Wednesday</h1>
              <h1>Thursday</h1>
              <h1>Friday</h1>
            </div>

            <div className={styles.attendanceBody}>
              {Object.keys(attendanceData).map((key) => (
                <h1 key={key}>
                  {attendanceData[key]?.date || ""} - {" "}
                  {attendanceData[key]?.status || "absent"}
                </h1>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.addBtn}>
          <input placeholder="choose date" type="date" />
        </div>
      </div>
    </>
  );
}

export default StudentAttendance;
