import React, { useState, useEffect } from "react";
import styles from "@/styles/parent_portal_css/studentClassScore.module.css";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

function StudentClassScore({ varifiedStudent, classTestVerifiedStudent }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectScores, setSubjectScores] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("Term One");

  useEffect(() => {
    if (classTestVerifiedStudent) {
      setSubjectScores(classTestVerifiedStudent);
    }

    if (varifiedStudent[0].Class) {
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
        varifiedStudent[0]?.Class === "Creche" ||
        varifiedStudent[0]?.Class === "Nursery 1" ||
        varifiedStudent[0]?.Class === "Nursery 2"
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
  }, [classTestVerifiedStudent, varifiedStudent]);

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const renderSubjectScores = (term, subject) => {
    if (subjectScores[term] && subjectScores[term][subject]) {
      return Object.values(subjectScores[term][subject]).map(
        (scoreObj, index) => (
          <div key={index} className={styles.scores}>{`Date: ${
            scoreObj.date
          } - Score: ${scoreObj.score} out of ${scoreObj?.outOf || "0"}`}</div>
        )
      );
    }
    return <div>No scores available for this subject</div>;
  };

  return (
    <>
      <div className={styles.classScoreContainer}>
        <div className={styles.classScoreItems}>
          <div className={styles.termSelection}>
            <label>Select Term:</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
            >
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

          <div className={styles.subjectHeader}>
            <h1>{`Class Test - ${selectedTerm} - ${selectedSubject}`}</h1>
          </div>

          <div className={styles.subjectScores}>
            <p>{renderSubjectScores(selectedTerm, selectedSubject)}</p>
          </div>
        </div>
      </div>
      <div className={styles.addScoreBtnContainer}>
        <button onClick={() => setOpenModal(true)}>Choose Subject</button>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Choose Subject</DialogTitle>
        <DialogContent>
          <div className={styles.subjectContainer}>
            {subjects.map((subject) => (
              <div key={subject} className={styles.subjectItem}>
                <h1 onClick={() => selectSubject(subject)}>{subject}</h1>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StudentClassScore;
