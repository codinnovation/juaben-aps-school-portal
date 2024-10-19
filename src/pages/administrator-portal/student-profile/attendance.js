import React, { useState, useEffect } from "react";
import styles from "@/styles/admin_portal_css/studentAttendance.module.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import { ref, get } from "firebase/database";
import { db } from "../../../lib/firebase";
import DriverPhoto from '../../../../public/studentprofile.avif'


function StudentAttendance({ selectedStudent, hideStudentProfilePage, navigateToComp, activeComponent }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [term, setTerm] = useState("Term One");
  const [editMode, setEditMode] = useState(false);


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
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profileHeader}>
            <div className={styles.backButton}>
              <div
                className={styles.button}
                onClick={hideStudentProfilePage}
              >
                <KeyboardDoubleArrowLeftIcon className={styles.icon} />
                <h1>Back</h1>
              </div>
            </div>
          </div>

          <div className={styles.profileNavigation}>
            <div
              className={`${styles.link} ${activeComponent === "profile" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("profile")}
            >
              <h1 className={styles.h1}>Profile</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "attendance" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("attendance")}
            >
              <h1 className={styles.h1}>Attendance</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "fees" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("fees")}
            >
              <h1 className={styles.h1}>Fees</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "individualTest" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("individualTest")}
            >
              <h1 className={styles.h1}>Individual Test</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "groupWork" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("groupWork")}
            >
              <h1 className={styles.h1}>Group Work</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "projectWork" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("projectWork")}
            >
              <h1 className={styles.h1}>Project Work</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "classTest" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("classTest")}
            >
              <h1 className={styles.h1}>Class Test</h1>
            </div>
          </div>

          <div className={styles.studentProfile}>
            <div className={styles.studentPhoto}>
              <Image
                src={DriverPhoto}
                alt="driver-profile"
                className={styles.image}
              />
            </div>

            <div className={styles.studentName}>
              <h1>{`${selectedStudent?.FirstName} ${selectedStudent?.LastName}`}</h1>
            </div>


            <div className={styles.editContainer}>
              <div
                className={styles.edit}
                onClick={() => setEditMode(!editMode)}
              >
                <EditIcon className={styles.editIcon} />
                <p>Edit</p>
              </div>

              <div className={styles.saveChangesButton}>
                <button
                  className={editMode ? styles.saveChangesButtonActive : ""}
                  disabled={editMode ? false : true}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

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
      </div>
    </>
  );
}

export default StudentAttendance;
