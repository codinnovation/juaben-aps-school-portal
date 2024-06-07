import React, { useState, useEffect } from "react";
import styles from "@/styles/teachers_portal_css/studentClassScore.module.css";
import { ref, get, push } from "firebase/database";
import { db } from "../../../lib/firebase";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

function StudentClassScore({ selectedStudent }) {
  const [showAddScoreModal, setShowAddScoreModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectScore, setSubjectScore] = useState(0);
  const [subjectOutOfScore, setSubjectOutOfScore] = useState(0);
  const [subjectDate, setSubjectDate] = useState("");
  const [subjectScores, setSubjectScores] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [chooseSubModal, setChooseSubModal] = useState(false);
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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseSubModal = () => {
    setChooseSubModal(false);
  };

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    handleCloseSubModal();
  };

  const addSubjectScores = () => {
    if (user.displayName !== "Teacher") {
      toast.error("You do not have permission to add Class Test Scores");
    } else {
      const scoreRef = ref(
        db,
        `/japsstudents/${selectedStudent.key}/ClassTest/${selectedSubject}`
      );
      push(scoreRef, {
        score: subjectScore,
        date: subjectDate,
        outOf: subjectOutOfScore,
      })
        .then(() => {
          setSubjectScore(0);
          setSubjectDate("");
          setSubjectOutOfScore(0);
          setShowAddScoreModal(false);
        })
        .catch((error) => {
          console.error("Error adding subject score:");
        });
    }
  };

  const fetchSubjectScores = () => {
    const studentRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/ClassTest`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSubjectScores = (subject) => {
    if (subjectScores[subject]) {
      return Object.values(subjectScores[subject]).map((scoreObj, index) => (
        <div key={index} className={styles.scores}>{`Date: ${
          scoreObj.date
        } - Score: ${scoreObj.score} out of ${scoreObj?.outOf || "0"}`}</div>
      ));
    }
    return <div>No scores available for this subject</div>;
  };

  return (
    <>
      <div className={styles.classScoreContainer}>
        <div className={styles.classScoreItems}>
          <div className={styles.subjectHeader}>
            <h1>{`Class Test - ${selectedSubject}`}</h1>
          </div>

          <div className={styles.subjectScores}>
            <p>{renderSubjectScores(selectedSubject)}</p>
          </div>
        </div>
      </div>
      <div className={styles.addScoreBtnContainer}>
        <button onClick={() => setOpenModal(true)}>Add Scores</button>
        <button onClick={() => setChooseSubModal(true)}>Choose Subject</button>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add Scores</DialogTitle>
        <DialogContent>
          <div className={styles.subjName}>
            <span>Subject</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.subjDate}>
            <span>Date</span>
            <input
              type="date"
              value={subjectDate}
              onChange={(e) => setSubjectDate(e.target.value)}
            />
          </div>
          <div className={styles.subjScore}>
            <span>Score</span>
            <input
              type="number"
              value={subjectScore}
              onChange={(e) => setSubjectScore(e.target.value)}
            />
          </div>

          <div className={styles.subjScore}>
            <span>Out</span>
            <input
              type="number"
              value={subjectOutOfScore}
              onChange={(e) => setSubjectOutOfScore(e.target.value)}
            />
          </div>

          <div className={styles.addBtn}>
            <IconButton onClick={addSubjectScores}>Add</IconButton>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={chooseSubModal} onClose={handleCloseSubModal}>
        <DialogTitle>Choose Subject</DialogTitle>
        <DialogContent>
          <ul style={{ listStyle: "none" }}>
            {subjects.map((subject) => (
              <li key={subject} style={{ margin: "10px", width: "100%" }}>
                <button
                  onClick={() => selectSubject(subject)}
                  style={{ height: "40px" }}
                >
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
      <ToastContainer />
    </>
  );
}

export default StudentClassScore;
