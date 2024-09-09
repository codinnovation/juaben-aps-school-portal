import React, { useState, useEffect } from "react";
import styles from "@/styles/teachers_portal_css/studentClassScore.module.css";
import { ref, get, push, set } from "firebase/database";
import { db } from "../../../lib/firebase";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";

function StudentClassScore({ selectedStudent, usersTeachers }) {
  const [showAddScoreModal, setShowAddScoreModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectScore, setSubjectScore] = useState(0);
  const [subjectOutOfScore, setSubjectOutOfScore] = useState(0);
  const [subjectDate, setSubjectDate] = useState("");
  const [subjectScores, setSubjectScores] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [chooseSubject, setChooseSubject] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("Term One");
  const [subjects, setSubjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editSubject, setEditSubject] = useState("");
  const [editScoreId, setEditScoreId] = useState(null);
  const [editScore, setEditScore] = useState(0);
  const [editOutOfScore, setEditOutOfScore] = useState(0);
  const [editDate, setEditDate] = useState("");

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
        "English",
        "Mathematics",
        "Natural Science",
        "ICT",
        "Asante Twi",
        "RME",
        "Creative Arts",
        "French",
        "History",
      ]);
    }
  }, [selectedStudent?.Class]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    setChooseSubject(false);
  };

  const addSubjectScores = () => {
    if (!selectedTerm) {
      toast.error("Please select a term");
      return;
    }

    const scoreRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/Homework/${selectedTerm}/${selectedSubject}`
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

  const handleEditScore = (term, subject, scoreId) => {
    const score = subjectScores[term][subject][scoreId];
    setEditSubject(subject);
    setEditScoreId(scoreId);
    setEditScore(score.score);
    setEditOutOfScore(score.outOf);
    setEditDate(score.date);
    setEditMode(true);
  };

  const updateSubjectScore = () => {
    if (!editDate || !editScoreId) {
      toast.error("Please fill in all fields");
      return;
    }

    const scoreRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/Homework/${selectedTerm}/${editSubject}/${editScoreId}`
    );

    set(scoreRef, {
      score: editScore,
      date: editDate,
      outOf: editOutOfScore,
    })
      .then(() => {
        setEditMode(false);
        fetchSubjectScores();
        toast.success("Score updated successfully");
      })
      .catch((error) => {
        console.error("Error updating subject score:", error);
      });
  };

  const fetchSubjectScores = () => {
    const studentRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/Homework`
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
      return Object.entries(subjectScores[term][subject]).map(
        ([scoreId, scoreObj], index) => (
          <div key={scoreId} className={styles.scoresContainer}>
            <h1>Date: {scoreObj.date}</h1>
            <h1>
              Scored: {scoreObj.score} out of {scoreObj.outOf || "0"}
            </h1>
            <button onClick={() => handleEditScore(term, subject, scoreId)}>
              Edit
            </button>
          </div>
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
              <option value="Term One">Term One</option>
              <option value="Term Two" disabled>
                Term Two
              </option>
              <option value="Term Three" disabled>
                Term Three
              </option>
            </select>
          </div>

          <div className={styles.subjectHeader}>
            <h1>{`Homework - ${selectedTerm} - ${selectedSubject}`}</h1>
          </div>

          <div className={styles.subjectScores}>
            <p>{renderSubjectScores(selectedTerm, selectedSubject)}</p>
          </div>
        </div>

        <div className={styles.mobileAddScore}>
          <div
            className={styles.addContainer}
            onClick={() => setChooseSubject(true)}
          >
            <PanToolAltIcon className={styles.icon} />
            <h1> Subject</h1>
          </div>
          <div
            className={styles.addContainer}
            onClick={() => setOpenModal(true)}
          >
            <AddIcon className={styles.icon} />
            <h1> Score</h1>
          </div>{" "}
        </div>
      </div>
      <div className={styles.addScoreBtnContainer}>
        <button onClick={() => setOpenModal(true)}>Add Scores</button>
        <button onClick={() => setChooseSubject(true)}>Choose Subject</button>
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

      {chooseSubject && (
        <>
          <div className={styles.chooseSubjectContainer}>
            <h2>Choose The Subject</h2>

            {subjects.map((subject) => (
              <div className={styles.buttonContent} key={subject}>
                <button onClick={() => selectSubject(subject)}>
                  {subject}
                </button>
              </div>
            ))}

            <div className={styles.closeButton}>
              <button onClick={() => setChooseSubject(false)}>Hide</button>
            </div>
          </div>
        </>
      )}

      <Dialog open={editMode} onClose={() => setEditMode(false)}>
        <DialogTitle>Edit Score</DialogTitle>
        <DialogContent>
          <div className={styles.subjName}>
            <span>Subject</span>
            <input type="text" value={editSubject} readOnly />
          </div>

          <div className={styles.subjDate}>
            <span>Date</span>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
          </div>
          <div className={styles.subjScore}>
            <span>Score</span>
            <input
              type="number"
              value={editScore}
              onChange={(e) => setEditScore(e.target.value)}
            />
          </div>

          <div className={styles.subjScore}>
            <span>Out of</span>
            <input
              type="number"
              value={editOutOfScore}
              onChange={(e) => setEditOutOfScore(e.target.value)}
            />
          </div>

          <div className={styles.addBtn}>
            <IconButton onClick={updateSubjectScore}>Update</IconButton>
          </div>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
}

export default StudentClassScore;
