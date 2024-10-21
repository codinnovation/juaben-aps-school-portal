import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/admin_portal_css/profile.module.css";
import DriverPhoto from '../../../../public/teacher.jpg'
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


function TeacherProfile({
  hideTeacherProfile,
  selectedTeacher,
}) {
  const router = useRouter()
  const [activeComponent, setActiveComponent] = useState("profile");
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editDriverHolder, setEditDriverHolder] = useState({
    FirstName: selectedTeacher?.FirstName,
    MiddleName: selectedTeacher?.MiddleName,
    LastName: selectedTeacher?.LastName,
    ClassToTeacher: selectedTeacher?.ClassToTeacher,
    TeacherPhone: selectedTeacher?.TeacherPhone,
    Gender: selectedTeacher?.Gender,
    DateOfAppointment: selectedTeacher?.DateOfAppointment,
    Qualification: selectedTeacher?.Qualification,
    YearOfQualification: selectedTeacher?.YearOfQualification
  });


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const navigateToComp = (compName) => {
    setActiveComponent(compName);
  };

  const handleRemoveStudent = async () => {
    try {
      await remove(ref(db, `japsteachers/${selectedTeacher.key}`));
      toast.success(`Student ${selectedTeacher.key} removed successfully`);
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
      const studentRef = ref(db, `japsteachers/${selectedTeacher.key}`);
      await update(studentRef, editDriverHolder);
      toast.success(`Teacher Profile updated`);
      window.location.reload();
    } catch (error) {
      console.error("Error updating Teacher:", error);
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

      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profileHeader}>
            <div className={styles.backButton}>
              <div
                className={styles.button}
                onClick={hideTeacherProfile}
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
          </div>

          <div className={styles.driverAccountProfile}>
            <div className={styles.driverPhoto}>
              <Image
                src={DriverPhoto}
                alt="driver-profile"
                className={styles.image}
              />
            </div>

            <div className={styles.driverName}>
              <h1>{`${selectedTeacher?.FirstName} ${selectedTeacher?.LastName}`}</h1>
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

          {activeComponent === "profile" && (

            <div className={styles.driverInformationContainer}>
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
                    <h1>{selectedTeacher?.FirstName || "No FirstName"}</h1>
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
                    <h1>{selectedTeacher?.MiddleName || "No Last Name"}</h1>
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
                      {selectedTeacher?.LastName || "No Last Name"}
                    </h1>
                  )}
                </div>


                <div className={styles.field}>
                  <label>Class To Teacher</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="ClassToTeacher"
                      value={editDriverHolder.ClassToTeacher}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>
                      {selectedTeacher?.ClassToTeacher}
                    </h1>
                  )}
                </div>


                <div className={styles.field}>
                  <label>Teacher Phone</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="TeacherPhone"
                      value={editDriverHolder.TeacherPhone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>
                      {selectedTeacher?.TeacherPhone || "No Gender"}
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
                      {selectedTeacher?.Gender || "No Gender"}
                    </h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Date Of Appointment</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="DateOfAppointment"
                      value={editDriverHolder.DateOfAppointment}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedTeacher?.DateOfAppointment || "No DateOfAppointment"}</h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Qualification</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="Qualification"
                      value={editDriverHolder.Qualification}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>
                      {selectedTeacher?.Qualification || "No Qualification"}
                    </h1>
                  )}
                </div>

                <div className={styles.field}>
                  <label>Year Of Qualification</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="YearOfQualification"
                      value={editDriverHolder.YearOfQualification}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <h1>{selectedTeacher?.YearOfQualification || "No YearOfQualification"}</h1>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
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
            <Button onClick={handleRemoveStudent}>Yes</Button>
            <Button onClick={handleCloseModal}>No</Button>
          </ul>
        </DialogContent>
      </Dialog>


      <ToastContainer />
    </>
  );
}

export default TeacherProfile;

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
