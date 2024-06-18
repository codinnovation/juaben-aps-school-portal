import React, { useState, useEffect } from "react";
import styles from "@/styles/teachers_portal_css/attendance.module.css";
import { ref, get, push } from "firebase/database";
import { db } from "../../../lib/firebase";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

function StudentAttendance({ selectedStudent }) {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
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
          if (data) {
            const attendanceArray = Object.values(data);
            setAttendanceData(attendanceArray);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const addAttendance = () => {
    const studentRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/attendance`
    );

    const dateObj = new Date(date);
    const options = { weekday: "long" };
    const day = dateObj.toLocaleDateString(undefined, options);

    const newAttendance = {
      date: date,
      day: day,
      status: status,
    };

    push(studentRef, newAttendance)
      .then(() => {
        console.log("Attendance added successfully.");
        fetchAttendanceData();
      })
      .catch((error) => {
        console.error("Error adding attendance:", error);
      });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const splitAttendanceIntoGroups = (data, groupSize) => {
    const groupedData = [];
    for (let i = 0; i < data.length; i += groupSize) {
      groupedData.push(data.slice(i, i + groupSize));
    }
    return groupedData;
  };

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const groupedAttendanceData = splitAttendanceIntoGroups(attendanceData, 5);

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

            {groupedAttendanceData.map((group, rowIndex) => (
              <div className={styles.attendanceBody} key={rowIndex}>
                {group.map((attendance, index) => (
                  <p key={index}>{`${attendance.status} - ${formatDate(attendance.date)}`}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.addBtn}>
          <button onClick={() => setOpenModal(true)}>Add Attendance</button>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedStudent?.FirstName}</DialogTitle>
        <DialogContent>
          <div className={styles.studentAttendanceContainer}>
            <div className={styles.header}>
              <h1>Add Attendance</h1>
            </div>
            <div className={styles.dateFieldContainer}>
              <label>Date</label>
              <input type="date" value={date} onChange={handleDateChange} />
            </div>

            <div className={styles.statusFieldContainer}>
              <label>Status:</label>
              <select value={status} onChange={handleStatusChange}>
                <option value=""></option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            <div
              className={styles.addAttendanceBtn}
              style={{ marginTop: "10px" }}
            >
              <button
                onClick={addAttendance}
                style={{
                  padding: "10px",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Add Attendance
              </button>
              <button
                onClick={handleCloseModal}
                style={{
                  padding: "10px",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
}

export default StudentAttendance;
