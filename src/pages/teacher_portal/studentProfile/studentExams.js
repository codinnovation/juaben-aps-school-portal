import React from "react";
import styles from "../../../styles/teachers_portal_css/studentExam.module.css";

function StudentExams() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Semester 1</h1>
          <h1>Kwabena Asumadu</h1>
        </div>

        <div className={styles.resultsTable}>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Class Score</th>
                <th>Exam Score</th>
                <th>Grade</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mathematics</td>
                <td>50%</td>
                <td>85%</td>
                <td>A</td>
                <td>1st</td>
              </tr>
              <tr>
                <td>Science</td>
                <td>30%</td>
                <td>95%</td>
                <td>B</td>
                <td>2nd</td>
              </tr>

              <tr>
                <td>Science</td>
                <td>30%</td>
                <td>95%</td>
                <td>B</td>
                <td>2nd</td>
              </tr>

              <tr>
                <td>Science</td>
                <td>30%</td>
                <td>95%</td>
                <td>B</td>
                <td>2nd</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StudentExams;
