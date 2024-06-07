import React, { useState, useEffect } from "react";
import styles from "../../../styles/admin_portal_css/studentClassScore.module.css";
import Image from "next/image";
import { ref, get } from "firebase/database";
import { db } from "../../../lib/firebase";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

function StudentClassScore({
  hideStudentProfilePage,
  navigateToComp,
  selectedStudent,
}) {
  const [subjectScores, setSubjectScores] = useState({});
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (
      selectedStudent?.Class === "K.G 1" ||
      selectedStudent?.Class === "K.G 2"
    ) {
      setSubjects([
        "",
        "English Literacy",
        "Creative Art",
        "Phonics Writing",
        "Copy & Picture Reading",
        "Numeracy",
        "OWOP",
      ]);
    } else if (
      selectedStudent?.Class === "Creche" ||
      selectedStudent?.Class === "Nursary 1" ||
      selectedStudent?.Class === "Nursary 2"
    ) {
      setSubjects([
        "",
        "Copy & Picuture Reading",
        "Phonics Colouring",
        "Numeracy",
        "Phonics Writing",
      ]);
    } else {
      setSubjects([
        "",
        "English",
        "Science",
        "Creative Art",
        "RME",
        "AsanteTWI",
        "Mathematics",
        "French",
        "Computer",
        "OWOP",
      ]);
    }
  }, [selectedStudent?.Class]);
  const [showSubjectSelectionModal, setShowSubjectSelectionModal] =
    useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const openSubjectSelectionModal = () => {
    setShowSubjectSelectionModal(true);
  };

  const closeSubjectSelectionModal = () => {
    setShowSubjectSelectionModal(false);
  };

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    closeSubjectSelectionModal();
  };

  const fetchSubjectScores = () => {
    const studentRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/ClassScore`
    );
    get(studentRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSubjectScores(snapshot.val());
        } else {
          setSubjectScores({});
        }
      })
      .catch((error) => {
        console.error("Error fetching subject scores:");
      });
  };

  useEffect(() => {
    fetchSubjectScores();
  }, []);

  // {`Date: ${scoreObj.date} - Score: ${scoreObj.score}`}
  const renderSubjectScores = (subject) => {
    if (subjectScores[subject]) {
      return Object.values(subjectScores[subject]).map((scoreObj, index) => (
        <div key={index} className={styles.scoreContainer}>
          <div className={styles.scoreItems}>
            <div className={styles.item}>
              <label>Date</label>
              <h1>{`${scoreObj.date}`}</h1>
            </div>
            
            <div className={styles.item}>
              <label>Score</label>
              <h1>{`${scoreObj.score} / ${scoreObj?.outOf}`}</h1>
            </div>
          </div>
        </div>
      ));
    }
    return <div style={{fontSize: '13px'}}>No scores available for this subject</div>;
  };

  const navigateToStudentProfilePage = () => {
    navigateToComp("studentProfile");
  };

  const navigateToStudentAttendance = () => {
    navigateToComp("studentAttendance");
  };

  const navigateToStudentFees = () => {
    navigateToComp("studentFees");
  };

  const navigateToStudentGuardian = () => {
    navigateToComp("studentGuardian");
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
              selectedStudent?.MiddleName || ""
            } ${selectedStudent?.LastName || ""}`}</h1>
          </div>

          <div className={styles.studentNavLinks}>
            <ul>
              <li>
                <button onClick={navigateToStudentProfilePage}>
                  Profile Page
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
                <button onClick={navigateToStudentAttendance}>
                  Attendance
                </button>
              </li>

              <li>
                <button onClick={navigateToStudentFees}>Fees</button>
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

        <div className={styles.Formcontainer}>
          <div className={styles.classScoreTable}>
            <div className={styles.subjectHeader}>
              <h1>{`Class Exercise - ${selectedSubject}`}</h1>
            </div>

            <div className={styles.subjectScores}>
              <p>{renderSubjectScores(selectedSubject)}</p>
            </div>
          </div>

          <div className={styles.addScoreBtnContainer}>
            <button onClick={openSubjectSelectionModal}>Choose Subject</button>
          </div>
        </div>
      </div>
      <Dialog
        open={showSubjectSelectionModal}
        onClose={closeSubjectSelectionModal}
      >
        <DialogTitle>Select a Subject</DialogTitle>
        <DialogContent>
          <ul>
            {subjects.map((subject) => (
              <li key={subject} style={{margin:'5px'}}>
                <button onClick={() => selectSubject(subject)} style={{padding:'10px'}}>
                  {subject}
                </button>
              </li>
            ))}
          </ul>
          <IconButton onClick={closeSubjectSelectionModal}>Close</IconButton>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StudentClassScore;
