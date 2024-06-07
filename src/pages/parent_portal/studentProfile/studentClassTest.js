import React, { useState, useEffect } from "react";
import styles from "@/styles/parent_portal_css/classtest.module.css";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

function StudentClassScore({ varifiedStudent }) {
  const [openModal, setOpenModal] = useState(false);
  const subjects = ["TWI", "ENG", "INT_SCI", "ICT", "RME"];
  const [selectedSubject, setSelectedSubject] = useState("TWI");
  const [subjectScores, setSubjectScores] = useState([]);

  const renderSubjectScores = () => {
    if (subjectScores && selectedSubject && subjectScores[selectedSubject]) {
      const selectedSubjectScores = Object.values(
        subjectScores[selectedSubject]
      );

      if (selectedSubjectScores.length > 0) {
        return selectedSubjectScores.map((scoreObj, index) => (
          <div key={index}>
            <p>
              Date: {scoreObj.date} - Score: {scoreObj.score}
            </p>
          </div>
        ));
      } else {
        return <div>No scores available for this subject</div>;
      }
    } else {
      return <div>No scores available for this subject</div>;
    }
  };

  useEffect(() => {
    if (varifiedStudent?.length || ("" > 0 && varifiedStudent[0].ClassTest)) {
      setSubjectScores(varifiedStudent[0].ClassTest);
    }
  }, [varifiedStudent]);

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className={styles.classScoreContainer}>
        <div className={styles.classScoreItems}>
          <div className={styles.subjectHeader}>
            <h1>{`Subject - ${selectedSubject}`}</h1>
          </div>

          <div className={styles.subjectScores}>
            <p>{renderSubjectScores()}</p>
          </div>
        </div>
      </div>
      <div className={styles.addScoreBtnContainer}>
        <button onClick={() => setOpenModal(true)}>Choose Subject</button>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
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
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StudentClassScore;
