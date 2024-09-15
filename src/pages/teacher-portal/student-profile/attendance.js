import React, { useState, useEffect } from 'react';
import styles from '@/styles/teachers_portal_css/attendance.module.css';
import { ref, get, push } from 'firebase/database';
import { db } from '../../../lib/firebase';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

function Attendance({ selectedStudent }) {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [term, setTerm] = useState('Term One');
  const [attendanceData, setAttendanceData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchAttendanceData = () => {
      const studentRef = ref(db, `/japsstudents/${selectedStudent.key}/attendance`);
      get(studentRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setAttendanceData(data || {});
          }
        })
        .catch((error) => {
          console.error('Error fetching attendance data:', error);
        });
    };
    fetchAttendanceData()
  }, [selectedStudent.key]);

  const addAttendance = () => {
    if (!term) {
      toast.error('Please select a term');
      return;
    }

    const termRef = ref(db, `/japsstudents/${selectedStudent.key}/attendance/${term}`);

    const dateObj = new Date(date);
    const options = { weekday: 'long' };
    const day = dateObj.toLocaleDateString(undefined, options);

    const newAttendance = {
      date: date,
      day: day,
      status: status,
    };

    push(termRef, newAttendance)
      .then(() => {
        fetchAttendanceData();
        handleCloseModal();
        toast.success('Attendance added successfully');
      })
      .catch((error) => {
        toast.error('Error adding attendance');
      });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  // Helper function to get the abbreviated status
  const getAbbreviatedStatus = (status) => {
    switch (status) {
      case 'Present':
        return 'P';
      case 'Absent':
        return 'A';
      default:
        return '';
    }
  };

  const renderAttendanceByDay = (day) => {
    if (!attendanceData[term]) return null;

    const dayAttendance = Object.values(attendanceData[term]).filter((record) => record.day === day);

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
              <option value=""></option>
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
                  <td>{renderAttendanceByDay('Monday')}</td>
                  <td>{renderAttendanceByDay('Tuesday')}</td>
                  <td>{renderAttendanceByDay('Wednesday')}</td>
                  <td>{renderAttendanceByDay('Thursday')}</td>
                  <td>{renderAttendanceByDay('Friday')}</td>
                </tr>
              </tbody>
            </table>
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

            <div className={styles.termFieldContainer}>
              <label>Term:</label>
              <select value={term} onChange={handleTermChange}>
                <option value=""></option>
                <option value="Term One">Term 1</option>
                <option value="Term Two" disabled>
                  Term 2
                </option>
                <option value="Term Three" disabled>
                  Term 3
                </option>
              </select>
            </div>

            <div className={styles.addAttendanceBtn}>
              <button onClick={addAttendance}>Add Attendance</button>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
}

export default Attendance;
