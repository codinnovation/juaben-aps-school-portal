import React, { useState, useEffect } from "react";
import styles from "@/styles/parent_portal_css/studentClassScore.module.css";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

function StudentClassScore({ navigateToComp, varifiedStudent }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectScores, setSubjectScores] = useState({});
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (varifiedStudent?.length ? varifiedStudent[0].ClassScore : '') {
      setSubjectScores(varifiedStudent[0].ClassScore);
    }

    if (varifiedStudent?.length && varifiedStudent[0].Class) {
      if (
        varifiedStudent[0].Class === "K.G 1" ||
        varifiedStudent[0].Class === "K.G 2"
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
        varifiedStudent[0].Class === "Creche" ||
        varifiedStudent[0].Class === "Nursary"
      ) {
        setSubjects([
          "",
          "Copy & Picture Reading",
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
    }
  }, [varifiedStudent]);

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const renderSubjectScores = () => {
    const selectedSubjectScores = subjectScores[selectedSubject];

    if (selectedSubjectScores && selectedSubjectScores.length > 0) {
      return selectedSubjectScores.map((scoreObj, index) => (
        <div key={index} className={styles.scoreItem}>
          <p>{`Date: ${scoreObj.date} - Score: ${scoreObj.score} out of ${scoreObj.outOf}`}</p>
        </div>
      ));
    } else {
      return <div>No scores available for this subject</div>
    }
  };

  return (
    <>
      <div className={styles.classScoreContainer}>
        <div className={styles.classScoreItems}>
          <div className={styles.subjectHeader}>
            <h1>Subject - {selectedSubject || "Select a Subject"}</h1>
          </div>

          <div className={styles.subjectScores}>{renderSubjectScores()}</div>
        </div>
      </div>
      <div className={styles.addScoreBtnContainer}>
        <button onClick={() => setOpenModal(true)}>Choose Subject</button>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Choose Subject</DialogTitle>
        <DialogContent>
          <ul className={styles.subjectList}>
            {subjects.map((subject) => (
              <li key={subject} className={styles.subjectItem}>
                <button onClick={() => selectSubject(subject)}>
                  {subject}
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StudentClassScore;
