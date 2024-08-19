import React, { useState, useEffect } from "react";
import styles from "@/styles/parent_portal_css/studentProfilePage.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import EventAvailable from "@mui/icons-material/EventAvailable";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ref, get } from "firebase/database";
import { db } from "../../../lib/firebase";
import StudentAttendancecomp from "./studentAttendance";
import StudentClassScore from "./studentClassScore";
import StudentClassTest from "./studentClassTest";
import StudentHomework from "./studentHomework";
import StudentFees from "./studentFees";
import { useRouter } from "next/router";
import withSession from "@/lib/session";
import Layout from "../layout";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function StudentProfilePage({ user }) {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState("studentProfile");
  const [studentData, setStudentData] = useState([]);
  const [varifiedStudent, setVarifiedStudent] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  console.log(varifiedStudent)

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
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profileHeader}>
            <div className={styles.profilePageName}>
              <h1>Student Profile</h1>
            </div>

            <div className={styles.profileNavigation}>
              <button onClick={() => naviagteTo("studentProfile")}>
                Profile
              </button>
              <button onClick={() => naviagteTo("studentAttendance")}>
                Attendance
              </button>
              <button onClick={() => naviagteTo("studentClassScore")}>
                Class Score
              </button>
              <button onClick={() => naviagteTo("studentClassTest")}>
                Class Test
              </button>
              <button onClick={() => naviagteTo("studentHomework")}>
                Homework
              </button>
              <button onClick={() => naviagteTo("studentFees")}>
                School Fees
              </button>
            </div>

            <div className={styles.menuIconContainer}>
              <div className={styles.link} onClick={() => setOpenModal(true)}>
                <MenuIcon className={styles.icon} />
                <h1>Menu</h1>
              </div>

              <div className={styles.link}>
                <NotificationAddIcon className={styles.icon} />
                <h1>Notification</h1>
              </div>

              <div className={styles.link}>
                <EventAvailable className={styles.icon} />
                <h1>Events</h1>
              </div>
            </div>
          </div>

          {activeComponent === "studentProfile" && (
            <div className={styles.profileDetails}>
              <div className={styles.profileItems}>
                <div className={styles.item}>
                  <p>First Name</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].FirstName
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Middle Name</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].MiddleName
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Last Name</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].LastName
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Gender</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].Gender
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Date Of Birth</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0 ? varifiedStudent[0].DOB : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Student Number</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].StudentNumber
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Enrollment Date</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].EnrollmentDate
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Student Residence</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].StudentResidence
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Class</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0 ? varifiedStudent[0].Class : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>NHIS No</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].NHISno
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>NHIS Name</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].NHISName
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Guardian&apos;s Name</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].guardianName
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Guardian&apos;s Residence</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].guardianResidence
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Guardian&apos;s Phone</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].guardianPhone
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Guardian&apos;s Other Phone</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].guardianOtherPhone
                      : ""}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Mother&apos;s Residence</p>
                  <h1>
                    {" "}
                    {varifiedStudent.length > 0
                      ? varifiedStudent[0].MotherResidence
                      : ""}
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeComponent === "studentAttendance" && (
        <StudentAttendancecomp
          varifiedStudent={varifiedStudent}
          attendanceOfVerifiedStudent={attendanceOfVerifiedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
        />
      )}

      {activeComponent === "studentFees" && (
        <StudentFees
          varifiedStudent={varifiedStudent}
          verifiedStudentFees={verifiedStudentFees}
          hideStudentProfilePage={hideStudentProfilePage}
        />
      )}

      {activeComponent === "studentClassScore" && (
        <StudentClassScore
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

      <ToastContainer />
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
