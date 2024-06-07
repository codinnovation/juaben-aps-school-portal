import React, { useEffect, useState } from "react";
import styles from "../../../styles/teachers_portal_css/studentProfilePage.module.css";
import Menu from "@mui/icons-material/Menu";
import StudentAttendance from "./studentAttendance";
import StudentClassScore from "./studentClassScore";
import StudentClassTest from "./studentClassTest";
import StudentExams from "./studentExams";
import SetExamScores from "./setExamScores";
import StudentHomework from "./studentHomework";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { auth } from "../../../lib/firebase";
import withSession from "@/lib/session";
import { useRouter } from "next/router";

function StudentProfilePage({ selectedStudent, hideStudentProfilePage, user }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [activeComponent, setActiveComponent] = useState("studentProfile");


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const naviagteTo = (compName) => {
    setActiveComponent(compName);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerItems}>
          <div className={styles.containerHeader}>
            <div className={styles.item1}>
              <h1>{`Profile - ${selectedStudent?.FirstName} ${selectedStudent?.LastName}`}</h1>
            </div>

            <div className={styles.navContainer}>
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
                Home Work
              </button>
            </div>

            <div
              className={styles.menuContainer}
              onClick={() => setOpenModal(true)}
            >
              <Menu />
            </div>
          </div>
        </div>

        {activeComponent === "studentProfile" && (
          <div className={styles.profileContainer}>
            <div className={styles.profileItems}>
              <div className={styles.items}>
                <div className={styles.item}>
                  <p>First Name</p>
                  <h1>{selectedStudent?.FirstName}</h1>
                </div>

                <div className={styles.item}>
                  <p>Middle Name</p>
                  <h1>{selectedStudent?.MiddleName}</h1>
                </div>

                <div className={styles.item}>
                  <p>Last Name</p>
                  <h1>{selectedStudent?.LastName}</h1>
                </div>

                <div className={styles.item}>
                  <p>Gender</p>
                  <h1>{selectedStudent?.Gender}</h1>
                </div>

                <div className={styles.item}>
                  <p>Date Of Birth</p>
                  <h1>{selectedStudent?.DOB}</h1>
                </div>

                <div className={styles.item}>
                  <p>Student Number</p>
                  <h1>{selectedStudent?.StudentNumber}</h1>
                </div>

                <div className={styles.item}>
                  <p>Enrollment Date</p>
                  <h1>{selectedStudent?.EnrollmentDate}</h1>
                </div>

                <div className={styles.item}>
                  <p>Student Residence</p>
                  <h1>{selectedStudent?.StudentResidence}</h1>
                </div>

                <div className={styles.item}>
                  <p>Class</p>
                  <h1>{selectedStudent?.Class}</h1>
                </div>

                <div className={styles.item}>
                  <p>NHIS No</p>
                  <h1>{selectedStudent?.NHISno || "No NHIS Number"}</h1>
                </div>

                <div className={styles.item}>
                  <p>NHIS Name</p>
                  <h1>{selectedStudent?.NHISName || "No NHIS Name"}</h1>
                </div>

                <div className={styles.item}>
                  <p>Guardian&apos;s Name</p>
                  <h1>{selectedStudent?.guardianName || "No Guardian Name"}</h1>
                </div>

                <div className={styles.item}>
                  <p>Guardian&apos;s Residence</p>
                  <h1>
                    {selectedStudent?.guardianResidence ||
                      "No Guardian Residence"}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Guardian&apos;s Phone</p>
                  <h1>
                    {selectedStudent?.guardianPhone || "No Guardian Phone"}
                  </h1>
                </div>

                <div className={styles.item}>
                  <p>Guardian&apos;s Other Phone</p>
                  <h1>{selectedStudent?.guardianOtherPhone}</h1>
                </div>
              </div>
            </div>
            <div className={styles.backToList} onClick={hideStudentProfilePage}>
              <button>Back To List</button>
            </div>
          </div>
        )}
      </div>

      {activeComponent === "studentAttendance" && (
        <StudentAttendance selectedStudent={selectedStudent} />
      )}

      {activeComponent === "studentHomework" && (
        <StudentHomework selectedStudent={selectedStudent} />
      )}

      {activeComponent === "studentClassScore" && (
        <StudentClassScore selectedStudent={selectedStudent} />
      )}

      {activeComponent === "studentClassTest" && (
        <StudentClassTest selectedStudent={selectedStudent} />
      )}

      {activeComponent === "studentExams" && (
        <StudentExams selectedStudent={selectedStudent} />
      )}

      {activeComponent === "setExamScores" && (
        <SetExamScores selectedStudent={selectedStudent} />
      )}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{user?.user?.displayName}</DialogTitle>
        <DialogContent>
          <div className={styles.menuContainerNav}>
            <ul
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                listStyle: "none",
              }}
            >
              <li
                onClick={() => naviagteTo("studentProfile")}
                style={{
                  backgroundColor: "#191970",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "20px",
                  width: "100%",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                Profile
              </li>
              <li
                onClick={() => naviagteTo("studentAttendance")}
                style={{
                  backgroundColor: "#191970",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "20px",
                  marginTop: "10px",
                  width: "100%",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                Attendance
              </li>

              <li
                onClick={() => naviagteTo("studentClassScore")}
                style={{
                  backgroundColor: "#191970",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "20px",
                  marginTop: "10px",
                  width: "100%",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                Class Score
              </li>

              <li
                onClick={() => naviagteTo("studentClassTest")}
                style={{
                  backgroundColor: "#191970",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "20px",
                  marginTop: "10px",
                  width: "100%",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                Class Test
              </li>

              <li
                onClick={() => naviagteTo("studentHomework")}
                style={{
                  backgroundColor: "#191970",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "20px",
                  marginTop: "10px",
                  width: "100%",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                Home Work
              </li>

              {/* <li
                onClick={() => naviagteTo("studentExams")}
                style={{
                  backgroundColor: "#191970",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "20px",
                  marginTop: "10px",
                }}
              >
                Exam Results
              </li>

              <li
                onClick={() => naviagteTo("setExamScores")}
                style={{
                  backgroundColor: "#191970",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "20px",
                  marginTop: "10px",
                }}
              >
                Exams Assessment
              </li> */}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
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
  return {
    props: {
      user: user,
    },
  };
});
