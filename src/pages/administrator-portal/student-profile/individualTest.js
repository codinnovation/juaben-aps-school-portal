import React, { useState, useEffect } from "react";
import styles from "../../../styles/admin_portal_css/individual-test.module.css";
import { ref, get } from "firebase/database";
import { db } from "../../../lib/firebase";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";


function IndividualTest({ selectedStudent, hideStudentProfilePage }) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectScores, setSubjectScores] = useState({});
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
        "Numeracy",
        "Language & Literacy",
        "Computing",
        "Creative Arts",
        "Literacy Writing",
        "Handwriting",
        "Numeracy Writing",
        "Colour Work"
      ]);
    } else if (
      selectedStudent?.Class === "Creche" ||
      selectedStudent?.Class === "Nursery 1" ||
      selectedStudent?.Class === "Nursery 2"
    ) {
      setSubjects([
        "",
        "Scribbling & Colour",
        "Numeracy",
        "Language & Literacy",
        "Picture Reading",
        "Scribbling Work",
        "Numeracy Reading & Writing",
        "Literacy Reading & Writing"
      ]);
    } else {
      setSubjects([
        "",
        "French",
        "Mathematics",
        "History",
        "English Language",
        "Science",
        "Writing Skills",
        "Creative Arts",
        "Ghanaian Language",
        "Religious & Moral Education",
        "Computing"
      ]);
    }
  }, [selectedStudent?.Class]);

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    setChooseSubject(false);
  };



  useEffect(() => {
    const fetchSubjectScores = () => {
      const studentRef = ref(
        db,
        `/japsstudents/${selectedStudent.key}/individualTest`
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
    fetchSubjectScores();
  }, [selectedStudent.key]);

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
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profileHeader}>
            <div className={styles.backButton}>
              <div
                className={styles.button}
                onClick={hideStudentProfilePage}
              >
                <KeyboardDoubleArrowLeftIcon className={styles.icon} />
                <h1>Back</h1>
              </div>
            </div>
          </div>
          <div className={styles.profileNavigation}>
            <div
              className={`${styles.link} `}
              onClick={() => navigateToComp("profile")}
            >
              <h1 className={styles.h1}>Profile</h1>
            </div>

            <div
              className={`${styles.link}`}
              onClick={() => navigateToComp("attendance")}
            >
              <h1 className={styles.h1}>Attendance</h1>
            </div>

            <div
              className={`${styles.link}`}
              onClick={() => navigateToComp("fees")}
            >
              <h1 className={styles.h1}>Fees</h1>
            </div>

            <div
              className={`${styles.link}`}
              onClick={() => navigateToComp("individualTest")}
            >
              <h1 className={styles.h1}>Individual Test</h1>
            </div>

            <div
              className={`${styles.link}`}
              onClick={() => navigateToComp("groupWork")}
            >
              <h1 className={styles.h1}>Group Work</h1>
            </div>

            <div
              className={`${styles.link}`}
              onClick={() => navigateToComp("projectWork")}
            >
              <h1 className={styles.h1}>Project Work</h1>
            </div>

            <div
              className={`${styles.link}`}
              onClick={() => navigateToComp("classTest")}
            >
              <h1 className={styles.h1}>Class Test</h1>
            </div>
          </div>
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
                <h1>{`Individual Test - ${selectedSubject}`}</h1>
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

            </div>
            <div className={styles.addScoreBtnContainer}>
              <button onClick={() => setChooseSubject(true)}>Choose Subject</button>
            </div>
          </div>
        </div>
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
    </>
  );
}

export default IndividualTest;
