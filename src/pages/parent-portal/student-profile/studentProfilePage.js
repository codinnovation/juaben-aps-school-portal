import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/parent_portal_css/studentProfilePage.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import EventAvailable from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import { Toaster, toast } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import DriverPhoto from '../../../../public/profile-photo (1).jpg'
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ref, get } from "firebase/database";
import { db } from "../../../lib/firebase";
import StudentAttendancecomp from "./studentAttendance";
import IndividualTest from "./individualTest";
import StudentClassTest from "./studentClassTest";
import StudentHomework from "./studentHomework";
import StudentFees from "./studentFees";
import { useRouter } from "next/router";
import withSession from "@/lib/session";
import Layout from "../layout";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from "@mui/icons-material/Edit";




function StudentProfilePage({ user }) {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState("profile");
  const [studentData, setStudentData] = useState([]);
  const [varifiedStudent, setVarifiedStudent] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const navigateToComp = (compName) => {
    setActiveComponent(compName);
  };

  const handleLogout = async (e) => {
    setIsButtonClicked(true);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Logout Successful");
        router.push("/login");
        setIsButtonClicked(false);
      } else {
        toast.error("Logout Failed");
        setIsButtonClicked(false);
      }
    } catch (error) {
      toast.error("Error Occurred");
      setIsButtonClicked(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const naviagteTo = (compName) => {
    setActiveComponent(compName);
    setOpenModal(false);
  };

  const hideStudentProfilePage = () => {
    router.push({
      pathname: "/parent_portal",
    });
  };

  useEffect(() => {
    setIsButtonClicked(true)
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "japsstudents");
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          setStudentData(dataArray);
          setIsButtonClicked(false)
        } else {
          setStudentData([]);
          setIsButtonClicked(false)

        }
      } catch (error) {
        console.error("Error fetching data:");
        setStudentData([]);
        setIsButtonClicked(false)

      }
    };

    fetchData();
  }, []);

  const extractNumericPart = (displayName) => {
    const match = displayName.match(/\d+/); // Regex to find numeric part
    return match ? match[0] : null;
  };

  useEffect(() => {
    if (user && studentData.length > 0) {
      const studentNumber = extractNumericPart(user.displayName);

      if (studentNumber) {
        const filteredStudents = studentData.filter(
          (student) => student.StudentNumber === studentNumber
        );
        setVarifiedStudent(filteredStudents);
      } else {
        setVarifiedStudent([]);
      }
    }
  }, [user, studentData]);

  const attendanceOfVerifiedStudent = varifiedStudent[0]?.attendance;
  const classScoreOfVerifiedStudent = varifiedStudent[0]?.ClassScore;
  const homeWorkfVerifiedStudent = varifiedStudent[0]?.Homework;
  const classTestVerifiedStudent = varifiedStudent[0]?.ClassTest;
  const verifiedStudentFees = varifiedStudent[0]?.SchoolFees;





  return (
    <>
      {isButtonClicked && (
        <>
          <div className={styles.loadingContainer}>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        </>
      )}
      <Layout />
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

              <div className={styles.deleteButton}>
                <div
                  className={styles.button}
                  onClick={handleLogout}
                >
                  <LogoutIcon className={styles.icon} />
                  <h1> Logout</h1>
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
                <h1>{`${varifiedStudent[0]?.FirstName} ${varifiedStudent[0]?.LastName}`}</h1>
              </div>


              <div className={styles.editContainer}>
                <div
                  className={styles.edit}
                  onClick={() => toast.error("You can't edit, contact the admin")}
                >
                  <EditIcon className={styles.editIcon} />
                  <p>Edit</p>
                </div>

                <div className={styles.saveChangesButton}>
                  <button
                    onClick={() => toast.error("You can't edit, contact the admin")}
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
                  <h1>{varifiedStudent[0]?.FirstName || "No FirstName"}</h1>
                </div>

                <div className={styles.field}>
                  <label>Middle Name</label>

                  <h1>{varifiedStudent[0]?.MiddleName || "No Last Name"}</h1>
                </div>

                <div className={styles.field}>
                  <label>Last Name</label>

                  <h1>
                    {varifiedStudent[0]?.LastName || "No Last Name"}
                  </h1>
                </div>


                <div className={styles.field}>
                  <label>Student Number</label>
                  <h1>
                    {varifiedStudent[0]?.StudentNumber}
                  </h1>
                </div>


                <div className={styles.field}>
                  <label>Gender</label>
                  <h1>
                    {varifiedStudent[0]?.Gender || "No Gender"}
                  </h1>
                </div>


                <div className={styles.field}>
                  <label>Class</label>
                  <h1>
                    {varifiedStudent[0]?.Class || "No Class"}
                  </h1>
                </div>

                <div className={styles.field}>
                  <label>Date Of Birth</label>
                  <h1>{varifiedStudent[0]?.DOB || "No DOB"}</h1>
                </div>

                <div className={styles.field}>
                  <label>Enrollment Date</label>
                  <h1>
                    {varifiedStudent[0]?.EnrollmentDate || "No EnrollmentDate"}
                  </h1>
                </div>

                <div className={styles.field}>
                  <label>Student Residence</label>
                  <h1>{varifiedStudent[0]?.StudentResidence || "No Student Residence"}</h1>
                </div>

                <div className={styles.field}>
                  <label>Denomination</label>
                  <h1>{varifiedStudent?.Denomination || "No Denomination"}</h1>
                </div>

                <div className={styles.field}>
                  <label>NHIS Number</label>
                  <h1>{varifiedStudent[0]?.NHISno || "No NHISno"}</h1>
                </div>

                <div className={styles.field}>
                  <label>NHIS Name</label>
                  <h1>{varifiedStudent[0]?.NHISName || "No NHISName"}</h1>
                </div>


                <div className={styles.field}>
                  <label>Guardian Name</label>
                  <h1>{varifiedStudent[0]?.guardianName || "No guardianName"}</h1>
                </div>



                <div className={styles.field}>
                  <label>Guardian Residence</label>
                  <h1>{varifiedStudent[0]?.guardianResidence || "No guardianResidence"}</h1>
                </div>

                <div className={styles.field}>
                  <label>Guardian Phone</label>
                  <h1>{varifiedStudent[0]?.guardianPhone || "No guardianPhone"}</h1>
                </div>


                <div className={styles.field}>
                  <label>Guardian OtherPhone</label>
                  <h1>{varifiedStudent[0]?.guardianOtherPhone || "No guardianOtherPhone"}</h1>
                </div>

                <div className={styles.field}>
                  <label>Former School</label>
                  <h1>{varifiedStudent[0]?.FormerSchool || "No FormerSchool"}</h1>
                </div>

                <div className={styles.field}>
                  <label>CauseOfLeaving</label>

                  <h1>{varifiedStudent[0]?.CauseOfLeaving || "No CauseOfLeaving"}</h1>

                </div>

                <div className={styles.field}>
                  <label>Guardian OtherPhone</label>

                  <h1>{varifiedStudent[0]?.guardianOtherPhone || "No guardianOtherPhone"}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {activeComponent === "attendance" && (
        <StudentAttendancecomp
          varifiedStudent={varifiedStudent}
          attendanceOfVerifiedStudent={attendanceOfVerifiedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
        />
      )}

      {activeComponent === "fees" && (
        <StudentFees
          varifiedStudent={varifiedStudent}
          verifiedStudentFees={verifiedStudentFees}
          hideStudentProfilePage={hideStudentProfilePage}
        />
      )}

      {activeComponent === "individualTest" && (
        <IndividualTest
          varifiedStudent={varifiedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
          classScoreOfVerifiedStudent={classScoreOfVerifiedStudent}
        />
      )}

      {activeComponent === "studentClassTest" && (
        <StudentClassTest
          varifiedStudent={varifiedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
          classTestVerifiedStudent={classTestVerifiedStudent}
        />
      )}

      {activeComponent === "studentHomework" && (
        <StudentHomework
          varifiedStudent={varifiedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
          homeWorkfVerifiedStudent={homeWorkfVerifiedStudent}
        />
      )}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{user?.displayName}</DialogTitle>
        <DialogContent>
          <div className={styles.navLinks}>
            <div
              className={styles.links}
              onClick={() => naviagteTo("studentProfile")}
            >
              <h1>Profile</h1>
            </div>

            <div
              className={styles.links}
              onClick={() => naviagteTo("studentAttendance")}
            >
              <h1>Attendance</h1>
            </div>

            <div
              className={styles.links}
              onClick={() => naviagteTo("studentClassScore")}
            >
              <h1>Class Score</h1>
            </div>

            <div
              className={styles.links}
              onClick={() => naviagteTo("studentClassTest")}
            >
              <h1>Class Test</h1>
            </div>

            <div
              className={styles.links}
              onClick={() => naviagteTo("studentHomework")}
            >
              <h1>Home Work</h1>
            </div>

            <div
              className={styles.links}
              onClick={() => naviagteTo("studentFees")}
            >
              <h1>Fees</h1>
            </div>

            <div className={styles.links} onClick={handleLogout}>
              <h1>Logout</h1>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  );
}

export default StudentProfilePage;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (user) {
    req.session.set("user", user);
    await req.session.save();
  }
});
