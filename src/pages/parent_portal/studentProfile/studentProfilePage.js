import React, { useState, useEffect } from "react";
import styles from "@/styles/parent_portal_css/studentProfilePage.module.css";
import Menu from "@mui/icons-material/Menu";
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

function StudentProfilePage({ attendance, user }) {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState("studentProfile");
  const [studentData, setStudentData] = useState([]);
  const [varifiedStudent, setVarifiedStudent] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [toggleVarifiedForm, setToggleVarifiedForm] = useState(false);
  const [inputData, setInputData] = useState({
    StudentNumber: "",
  });

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const naviagteTo = (compName) => {
    setActiveComponent(compName);
  };

  const hideStudentProfilePage = () => {
    router.push({
      pathname: "/parent_portal",
    });
  };

  useEffect(() => {
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
        } else {
          setStudentData([]);
        }
      } catch (error) {
        console.error("Error fetching data:");
        setStudentData([]);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const verified = studentData.filter((student) => {
      return student.StudentNumber === inputData.StudentNumber;
    });
    setVarifiedStudent(verified);
    setToggleVarifiedForm(false);
  };

  useEffect(() => {}, [varifiedStudent]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToggleVarifiedForm(true);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerItems}>
          <div className={styles.containerHeader}>
            <div className={styles.item1}>
              <h1>Student Profile</h1>
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
                Homework
              </button>
              <button onClick={() => naviagteTo("studentFees")}>
                School Fees
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
            <div className={styles.formContainer}>
              <div className={styles.inputFieldsContainer}>
                <form onSubmit={handleVerify}>
                  <div className={styles.inputFields}>
                    <input
                      type="text"
                      name="StudentNumber"
                      value={inputData?.StudentNumber || ""}
                      onChange={handleInputChange}
                      placeholder="Enter Student Number"
                    />
                  </div>

                  <div className={styles.submitBtn}>
                    <button>Submit</button>
                    <button onClick={() => setToggleVarifiedForm(false)}>
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {activeComponent === "studentAttendance" && (
        <StudentAttendancecomp
          varifiedStudent={varifiedStudent}
          attendance={attendance}
          hideStudentProfilePage={hideStudentProfilePage}
        />
      )}

      {activeComponent === "studentFees" && (
        <StudentFees
          varifiedStudent={varifiedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
        />
      )}

      {activeComponent === "studentClassScore" && (
        <StudentClassScore
          varifiedStudent={varifiedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
        />
      )}

      {activeComponent === "studentClassTest" && (
        <StudentClassTest
          varifiedStudent={varifiedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
        />
      )}

      {activeComponent === "studentHomework" && (
        <StudentHomework
          varifiedStudent={varifiedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
        />
      )}


      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{user?.displayName}</DialogTitle>
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
                }}
              >
                Homework
              </li>

              <li
                onClick={() => naviagteTo("studentFees")}
                style={{
                  backgroundColor: "#191970",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "20px",
                  marginTop: "10px",
                }}
              >
                School Fees
              </li>
            </ul>

            <div className={styles.varifyStudentContainer}>
              <form onSubmit={handleVerify}>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="StudentNumber"
                    value={inputData?.StudentNumber || ""}
                    onChange={handleInputChange}
                    placeholder="Enter Student Number"
                  />
                </div>

                <div className={styles.submitButton}>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
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
