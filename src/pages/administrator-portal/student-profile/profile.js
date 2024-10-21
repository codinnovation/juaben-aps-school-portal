import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/admin_portal_css/profile.module.css";
import DriverPhoto from '../../../../public/studentprofile.avif'
import Attendance from './attendance';
import ClassTest from './classTest';
import Fees from './fees';
import GroupWork from './groupWork'
import IndividualTest from "./individualTest";
import ProjectWork from "./projectWork";
import { db } from "../../../lib/firebase";
import { ref, remove, update } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Image from "next/image";
import { useRouter } from "next/router";
import withSession from "@/lib/session";


function StudentProfilePage({
  hideStudentProfilePage,
  selectedStudent,
  attendance
}) {
  const router = useRouter()
  const [activeComponent, setActiveComponent] = useState("profile");
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editDriverHolder, setEditDriverHolder] = useState({
    FirstName: selectedStudent?.FirstName,
    MiddleName: selectedStudent?.MiddleName,
    LastName: selectedStudent?.LastName,
    Class: selectedStudent?.Class,
    NHISno: selectedStudent?.NHISno,
    NHISName: selectedStudent?.NHISName,
    StudentResidence: selectedStudent?.StudentResidence,
    DOB: selectedStudent?.DOB,
    Gender: selectedStudent?.Gender,
    EnrollmentDate: selectedStudent?.EnrollmentDate,
    Denomination: selectedStudent?.Denomination,
    guardianName: selectedStudent?.guardianName,
    guardianResidence: selectedStudent?.guardianResidence,
    guardianPhone: selectedStudent?.guardianPhone,
    guardianOtherPhone: selectedStudent?.guardianOtherPhone,
    FormerSchool: selectedStudent?.FormerSchool,
    CauseOfLeaving: selectedStudent?.CauseOfLeaving,
    StudentNumber: selectedStudent?.StudentNumber
  });


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const navigateToComp = (compName) => {
    setActiveComponent(compName);
  };

  const handleRemoveStudent = async () => {
    try {
      await remove(ref(db, `japsstudents/${selectedStudent.key}`));
      toast.success(`Student ${selectedStudent.key} removed successfully`);
      hideStudentProfilePage();
    } catch (error) {
      console.error("Error deleting note:");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditDriverHolder({
      ...editDriverHolder,
      [name]: value
    });
  };

  const handleUpdateStudent = async (e) => {

    try {
      const studentRef = ref(db, `japsstudents/${selectedStudent.key}`);
      await update(studentRef, editDriverHolder);
      toast.success(`Student Profile updated`);
      window.location.reload();
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Error occured")
    }
  };

  return (
    <>
      <Head>
        <title>Juaben APS - Student Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {activeComponent === "profile" && (
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
                className={`${styles.link} ${activeComponent === "profile" ? styles.activeLink : ""}`}
                onClick={() => navigateToComp("profile")}
              >
                <h1 className={styles.h1}>Profile</h1>
              </div>

              <div
                className={`${styles.link} ${activeComponent === "attendance" ? styles.activeLink : ""}`}
                onClick={() => navigateToComp("attendance")}
              >
                <h1 className={styles.h1}>Attendance</h1>
              </div>

              <div
                className={`${styles.link} ${activeComponent === "fees" ? styles.activeLink : ""}`}
                onClick={() => navigateToComp("fees")}
              >
                <h1 className={styles.h1}>Fees</h1>
              </div>

              <div
                className={`${styles.link} ${activeComponent === "individualTest" ? styles.activeLink : ""}`}
                onClick={() => navigateToComp("individualTest")}
              >
                <h1 className={styles.h1}>Individual Test</h1>
              </div>

              <div
                className={`${styles.link} ${activeComponent === "groupWork" ? styles.activeLink : ""}`}
                onClick={() => navigateToComp("groupWork")}
              >
                <h1 className={styles.h1}>Group Work</h1>
              </div>

              <div
                className={`${styles.link} ${activeComponent === "projectWork" ? styles.activeLink : ""}`}
                onClick={() => navigateToComp("projectWork")}
              >
                <h1 className={styles.h1}>Project Work</h1>
              </div>

              <div
                className={`${styles.link} ${activeComponent === "classTest" ? styles.activeLink : ""}`}
                onClick={() => navigateToComp("classTest")}
              >
                <h1 className={styles.h1}>Class Test</h1>
              </div>
            </div>

            <div className={styles.studentProfile}>
              <div className={styles.studentPhoto}>
                <Image
                  src={DriverPhoto}
                  alt="driver-profile"
                  className={styles.image}
                />
              </div>

              <div className={styles.studentName}>
                <h1>{`${selectedStudent?.FirstName} ${selectedStudent?.LastName}`}</h1>
              </div>


              <div className={styles.editContainer}>
                <div
                  className={styles.edit}
                  onClick={() => setEditMode(!editMode)}
                >
                  <EditIcon className={styles.editIcon} />
                  <p>Edit</p>
                </div>

                <div className={styles.saveChangesButton}>
                  <button
                    className={editMode ? styles.saveChangesButtonActive : ""}
                    disabled={editMode ? false : true}
                    onClick={handleUpdateStudent}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>


            <div className={styles.studentInfoContainer}>
              <div className={styles.fieldContainer}>
                <div className={styles.field}>
                  <label>First Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="FirstName"
                      value={editDriverHolder.FirstName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.FirstName || "No FirstName"}</h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Middle Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="MiddleName"
                      value={editDriverHolder.MiddleName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.MiddleName || "No Last Name"}</h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Last Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="LastName"
                      value={editDriverHolder.LastName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>
                      {selectedStudent?.LastName || "No Last Name"}
                    </h1>
                  )}
                </div>


                <div className={styles.field}>
                  <label>Student Number</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="StudentNumber"
                      value={editDriverHolder.StudentNumber}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>
                      {selectedStudent?.StudentNumber}
                    </h1>
                  )}
                </div>


                <div className={styles.field}>
                  <label>Gender</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="Gender"
                      value={editDriverHolder.Gender}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>
                      {selectedStudent?.Gender || "No Gender"}
                    </h1>
                  )}
                </div>


                <div className={styles.field}>
                  <label>Class</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="Class"
                      value={editDriverHolder.Class}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>
                      {selectedStudent?.Class || "No Class"}
                    </h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Date Of Birth</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="DOB"
                      value={editDriverHolder.DOB}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.DOB || "No DOB"}</h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Enrollment Date</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="EnrollmentDate"
                      value={editDriverHolder.EnrollmentDate}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>
                      {selectedStudent?.EnrollmentDate || "No EnrollmentDate"}
                    </h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Student Residence</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="StudentResidence"
                      value={editDriverHolder.StudentResidence}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.StudentResidence || "No Student Residence"}</h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Denomination</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="Denomination"
                      value={editDriverHolder.Denomination}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.Denomination || "No Denomination"}</h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>NHIS Number</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="NHISno"
                      value={editDriverHolder.NHISno}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.NHISno || "No NHISno"}</h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>NHIS Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="NHISno"
                      value={editDriverHolder.NHISName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.NHISName || "No NHISName"}</h1>
                  )}
                </div>


                <div className={styles.field}>
                  <label>Guardian Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="guardianName"
                      value={editDriverHolder.guardianName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.guardianName || "No guardianName"}</h1>
                  )}
                </div>



                <div className={styles.field}>
                  <label>Guardian Residence</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="guardianResidence"
                      value={editDriverHolder.guardianResidence}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.guardianResidence || "No guardianResidence"}</h1>
                  )}
                </div>



                <div className={styles.field}>
                  <label>Guardian Phone</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="guardianPhone"
                      value={editDriverHolder.guardianPhone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.guardianPhone || "No guardianPhone"}</h1>
                  )}
                </div>


                <div className={styles.field}>
                  <label>Guardian OtherPhone</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="guardianOtherPhone"
                      value={editDriverHolder.guardianOtherPhone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.guardianOtherPhone || "No guardianOtherPhone"}</h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Former School</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="FormerSchool"
                      value={editDriverHolder.FormerSchool}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.FormerSchool || "No FormerSchool"}</h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>CauseOfLeaving</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="CauseOfLeaving"
                      value={editDriverHolder.CauseOfLeaving}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.CauseOfLeaving || "No CauseOfLeaving"}</h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Guardian OtherPhone</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="guardianOtherPhone"
                      value={editDriverHolder.guardianOtherPhone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedStudent?.guardianOtherPhone || "No guardianOtherPhone"}</h1>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

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
            <Button onClick={handleRemoveStudent}>Yes</Button>
            <Button onClick={handleCloseModal}>No</Button>
          </ul>
        </DialogContent>
      </Dialog>

      {activeComponent === "attendance" && (
        <Attendance
          navigateToComp={navigateToComp}
          selectedStudent={selectedStudent}
          attendance={attendance}
          hideStudentProfilePage={hideStudentProfilePage}
          activeComponent={activeComponent}
        />
      )}

      {activeComponent === "fees" && (
        <Fees
          navigateToComp={navigateToComp}
          hideStudentProfilePage={hideStudentProfilePage}
          selectedStudent={selectedStudent}
          activeComponent={activeComponent}
        />
      )}

      {activeComponent === "individualTest" && (
        <IndividualTest
          navigateToComp={navigateToComp}
          selectedStudent={selectedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
          activeComponent={activeComponent}

        />
      )}

      {activeComponent === "classTest" && (
        <ClassTest
          navigateToComp={navigateToComp}
          selectedStudent={selectedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
          activeComponent={activeComponent}

        />
      )}

      {activeComponent === "groupWork" && (
        <GroupWork
          navigateToComp={navigateToComp}
          selectedStudent={selectedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
          activeComponent={activeComponent}

        />
      )}
      {activeComponent === "projectWork" && (
        <ProjectWork
          navigateToComp={navigateToComp}
          selectedStudent={selectedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
          activeComponent={activeComponent}

        />
      )}

      <ToastContainer />
    </>
  );
}

export default StudentProfilePage;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (!user || user?.displayName !== "Administrator") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  auth.signOut();

  if (user) {
    req.session.set("user", user);
    await req.session.save();
  }

  return {
    props: {
      user,
    },
  };
});
