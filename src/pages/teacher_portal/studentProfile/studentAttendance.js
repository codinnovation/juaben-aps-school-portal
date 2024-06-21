import React, { useState, useEffect } from "react";
import styles from "@/styles/teachers_portal_css/attendance.module.css";
import { ref, get, push } from "firebase/database";
import { db } from "../../../lib/firebase";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

function StudentAttendance({ selectedStudent }) {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [semester, setSemester] = useState("");
  const [attendanceData, setAttendanceData] = useState({});
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
          setAttendanceData(data || {});
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
    if (!semester) {
      toast.error("Please select a semester");
      return;
    }

    const semesterRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/attendance/${semester}`
    );

    const dateObj = new Date(date);
    const options = { weekday: "long" };
    const day = dateObj.toLocaleDateString(undefined, options);

    const newAttendance = {
      date: date,
      day: day,
      status: status,
    };

    push(semesterRef, newAttendance)
      .then(() => {
        console.log("Attendance added successfully.");
        fetchAttendanceData();
        handleCloseModal();
        toast.success("Attendance added successfully");
      })
      .catch((error) => {
        console.error("Error adding attendance:", error);
        toast.error("Error adding attendance");
      });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const splitAttendanceIntoGroups = (data) => {
    const groupedData = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] };
    if (data) {
      Object.values(data).forEach((attendance) => {
        groupedData[attendance.day].push(attendance);
      });
    }
    return groupedData;
  };

  const groupedAttendanceData = semester ? splitAttendanceIntoGroups(attendanceData[semester]) : {};

  return (
    <>
      <div className={styles.attendanceContainer}>
        <div className={styles.attendanceItems}>
          <div className={styles.semesterSelection}>
            <label>Select Semester:</label>
            <select value={semester} onChange={handleSemesterChange}>
              <option value=""></option>
              <option value="Semester One">Semester One</option>
              <option value="Semester Two">Semester Two</option>
              <option value="Semester Three">Semester Three</option>
            </select>
          </div>

          {semester && (
            <div className={styles.attendanceTable}>
              <div className={styles.attendanceHeader}>
                <h1>Monday</h1>
                <h1>Tuesday</h1>
                <h1>Wednesday</h1>
                <h1>Thursday</h1>
                <h1>Friday</h1>
              </div>
              <div className={styles.attendanceBody}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <div key={day} className={styles.attendanceColumn}>
                    {groupedAttendanceData[day] ? (
                      groupedAttendanceData[day].map((attendance, index) => (
                        <p key={index}>{`${attendance.status} - ${formatDate(attendance.date)}`}</p>
                      ))
                    ) : (
                      <p>No attendance records</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
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

            <div className={styles.semesterFieldContainer}>
              <label>Semester:</label>
              <select value={semester} onChange={handleSemesterChange}>
                <option value=""></option>
                <option value="Semester One">Semester One</option>
                <option value="Semester Two">Semester Two</option>
                <option value="Semester Three">Semester Three</option>
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
