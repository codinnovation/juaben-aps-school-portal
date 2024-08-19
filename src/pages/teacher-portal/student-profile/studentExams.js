import React from "react";
import styles from "../../../styles/teachers_portal_css/studentExam.module.css";

function StudentExams() {
  return (
    <>
      <div className={styles.examContainer}>
        <div className={styles.examContents}>
          <div className={styles.examHeader}>
            <div className={styles.field}>
              <label>Name</label>
              <h1>Kwabena Asumadu Sakyi</h1>
            </div>
            <div className={styles.field}>
              <label>Class</label>
              <h1>Class 1</h1>
            </div>

            <div className={styles.field}>
              <label>Number on Roll</label>
              <h1>24</h1>
            </div>
            <div className={styles.field}>
              <label>Position in Class</label>
              <h1>1ST</h1>
            </div>

            <div className={styles.field}>
              <label>Clsoing Date</label>
              <h1>19/12/2024</h1>
            </div>

            <div className={styles.field}>
              <label>Reopening Date</label>
              <h1>8/09/2030</h1>
            </div>
          </div>


          <div className={styles.examResults}>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentExams;
