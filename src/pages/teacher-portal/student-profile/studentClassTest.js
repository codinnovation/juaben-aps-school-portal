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
  const [selectedTerm, setSelectedTerm] = useState("Term 1");
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
      selectedStudent?.Class === "Nursery 1" ||
      selectedStudent?.Class === "Nursery 2"
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
    if (!selectedTerm) {
      toast.error("Please select a term");
      return;
    }

    const scoreRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/ClassTest/${selectedTerm}/${selectedSubject}`
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
        fetchSubjectScores();
        toast.success("Score added successfully");
      })
      .catch((error) => {
        console.error("Error adding subject score:", error);
      });
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
        console.error("Error fetching subject scores:", error);
      });
  };

  useEffect(() => {
    fetchSubjectScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSubjectScores = (term, subject) => {
    if (subjectScores[term] && subjectScores[term][subject]) {
      return Object.values(subjectScores[term][subject]).map((scoreObj, index) => (
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
          <div className={styles.termSelection}>
            <label>Select Term:</label>
            <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
              <option value=""></option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2" disabled>Term 2</option>
              <option value="Term 3" disabled>Term 3</option>
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
            <span>Out of</span>
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
