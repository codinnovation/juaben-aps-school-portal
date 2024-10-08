import React from "react";
import styles from "../../../styles/admin_portal_css/secondHeader.module.css";

function SecondHeader() {
  return (
    <>
      <div className={styles.secondHeaderContainer}>
        <div className={styles.secondHeaderContent}>
          <div className={styles.dashboardName}>
            <h1>Admin Dashboard</h1>
            <p>Welcome, ksakyiasumadu@gmail.com</p>
          </div>

          <div className={styles.studentInfoContainer}>
            <h1>Add Student</h1>
            <h1>Logout</h1>
          </div>
        </div>
      </div>
    </>
  );
}
export default SecondHeader;
