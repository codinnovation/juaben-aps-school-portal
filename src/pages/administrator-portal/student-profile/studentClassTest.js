import React, { useState, useEffect } from "react";
import styles from "../../../styles/admin_portal_css/studentClassScore.module.css";
import { ref, get, push, set } from "firebase/database";
import { db } from "../../../lib/firebase";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";

function StudentClassScore({ selectedStudent }) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectScores, setSubjectScores] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [chooseSubject, setChooseSubject] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("Term One");
  const [subjects, setSubjects] = useState({});

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

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    setChooseSubject(false);
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
            <button
              onClick={() => handleEditScore(term, subject, scoreId)}
              disabled
            >
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
            <h1>{`Class Test - ${selectedTerm} - ${selectedSubject}`}</h1>
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
        <button onClick={() => setOpenModal(true)} disabled>
          Add Scores
        </button>
        <button onClick={() => setChooseSubject(true)}>Choose Subject</button>
      </div>

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

      <ToastContainer />
    </>
  );
}

export default StudentClassScore;
