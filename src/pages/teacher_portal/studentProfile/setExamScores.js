import React, { useEffect, useState } from "react";
import styles from "../../../styles/teachers_portal_css/setExamScore.module.css";
import { ref, get, set } from "firebase/database";
import { db} from "../../../lib/firebase";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

function SetExamScores({ selectedStudent }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("TWI");
  const [chooseSubModal, setChooseSubModal] = useState(false);
  const [subjectScores, setSubjectScores] = useState({});

  useEffect(() => {
    if (selectedStudent?.Class === "K.G 1" || selectedStudent?.Class === "K.G 2") {
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
      selectedStudent?.Class === "Nursary"
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



  const handleCloseSubModal = () => {
    setChooseSubModal(false);
  };

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    handleCloseSubModal();
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
  });

  const handleAddScore = (scoreObj) => {
    const studentRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/SemesterExams/examClassScore/${selectedSubject}`
    );
    set(studentRef, scoreObj)
      .then(() => {
        console.log("Score added successfully");
        // You may also want to update local state or trigger a re-fetch of data here if needed
      })
      .catch((error) => {
        console.error("Error adding score:");
      });
  };

  const renderSubjectScores = () => {
    if (subjectScores[selectedSubject]) {
      return Object.values(subjectScores[selectedSubject]).map(
        (scoreObj, index) => (
          <div key={index} className={styles.item}>
            <h1>{`Date: ${scoreObj.date} - Score: ${scoreObj.score}`}</h1>
            <button onClick={() => handleAddScore(scoreObj)}>Add</button>
          </div>
        )
      );
    }
    return <div>No scores available for this subject</div>;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Student Assessment</h1>
        </div>

        <div className={styles.containerItems}>
          <div className={styles.items}>
            <div className={styles.itemsHeader}>
              <h1>Subject - {selectedSubject}</h1>
            </div>
            <div className={styles.item}>{renderSubjectScores()}</div>
          </div>

          <div className={styles.buttons}>
            <button onClick={() => setChooseSubModal(true)}>
              Choose Subject
            </button>
          </div>
        </div>
      </div>
      <Dialog open={chooseSubModal} onClose={handleCloseSubModal}>
        <DialogTitle>Choose Subject</DialogTitle>
        <DialogContent>
          <ul>
            {subjects.map((subject) => (
              <li key={subject}>
                <button onClick={() => selectSubject(subject)}>
                  {subject}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.closeContainer}>
            <IconButton onClick={handleCloseSubModal}>Close</IconButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SetExamScores;
