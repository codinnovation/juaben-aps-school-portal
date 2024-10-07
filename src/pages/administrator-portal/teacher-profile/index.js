import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/admin_portal_css/profile.module.css";
import { db } from "../../../lib/firebase";
import { ref, remove } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Menu from "@mui/icons-material/Menu";

function StudentProfilePage({ hideTeacherProfile, selectedTeacher, }) {
  const [activeComponent, setActiveComponent] = useState("profile");
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const navigateToComp = (compName) => {
    setActiveComponent(compName);
  };


  return (
    <>
      <Head>
        <title>Juaben APS - Teacher&apos;s Profile</title>
        <meta name="description" content="Juaben APS School Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2.png" />
      </Head>

      <div className={styles.profilePageContainer}>
        <div className={styles.profilePageContent}>
          <div className={styles.profilePageHeader}>
            <div className={styles.profileName}>
              <h1>{`Profile - ${selectedTeacher?.FirstName} ${selectedTeacher?.LastName}`}</h1>
            </div>

            <div className={styles.navContainer}>
              <button onClick={() => navigateToComp("profile")}>
                Profile
              </button>
            </div>
            <div
              className={styles.menuContainer}
            >
              <Menu />
            </div>
          </div>
        </div>

        {activeComponent === "profile" && (
          <div className={styles.profileContainer}>
            <div className={styles.profileItems}>
              <div className={styles.items}>
                <div className={styles.item}>
                  <p>First Name</p>
                  <h1>{selectedTeacher?.FirstName}</h1>
                </div>

                <div className={styles.item}>
                  <p>Middle Name</p>
                  <h1>{selectedTeacher?.MiddleName}</h1>
                </div>

                <div className={styles.item}>
                  <p>Last Name</p>
                  <h1>{selectedTeacher?.LastName}</h1>
                </div>

                <div className={styles.item}>
                  <p>Class To Teacher</p>
                  <h1>{selectedTeacher?.ClassToTeacher}</h1>
                </div>

                <div className={styles.item}>
                  <p>Phone</p>
                  <h1>{selectedTeacher?.TeacherPhone}</h1>
                </div>

                <div className={styles.item}>
                  <p>Gender</p>
                  <h1>{selectedTeacher?.Gender}</h1>
                </div>

                <div className={styles.item}>
                  <p>Date Of Appointment</p>
                  <h1>{selectedTeacher?.DateOfAppointment}</h1>
                </div>

                <div className={styles.item}>
                  <p>Qualification</p>
                  <h1>{selectedTeacher?.Qualification}</h1>
                </div>

                <div className={styles.item}>
                  <p>Year Of Qualification</p>
                  <h1>{selectedTeacher?.YearOfQualification}</h1>
                </div>

              </div>
            </div>
            <div className={styles.backToList}>
              <button onClick={hideTeacherProfile}>Back To List</button>
              <button onClick={() => setOpenModal(true)}>Remove Teacher</button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle
          style={{ fontSize: "15px", textTransform: "uppercase" }}
        >{`Are you sure you want to delete`}</DialogTitle>
        <DialogContent>
          <ul
            style={{
              textDecoration: "none",
              listStyle: "none",
              fontFamily: "sans-serif",
            }}
          >
            <Button>Yes</Button>
            <Button onClick={handleCloseModal}>No</Button>
          </ul>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
}

export default StudentProfilePage;
