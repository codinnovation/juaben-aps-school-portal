import React, { useState, useEffect } from "react";
import styles from "../../../styles/teachers_portal_css/studentList.module.css";
import Person2 from "@mui/icons-material/Person2";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/icons-material/Menu";
import { auth, db } from "../../../lib/firebase";
import { ref } from "firebase/database";
import { get } from "firebase/database";
import StudentProfilePage from "../studentProfile/studentProfilePage";
import withSession from "@/lib/session";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

function Index({user}) {
  const [studentData, setStudentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentListView, setStudentListView] = useState(true);
  const [studentProfileVis, setStudentProfileVis] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(8);
  const [openModal, setOpenModal] = useState(false);
  const [openClassModal, setOpenClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const classArray = [
    "",
    "Creche",
    "Nursery 1",
    "Nursery 2",
    "K.G 1",
    "K.G 2",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
  ];

  const router = useRouter();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseClassModal = () => {
    setOpenClassModal(false);
  };

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:");
    }
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

  const searchForStudent = studentData.filter(
    (student) =>
      student.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.MiddleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.StudentNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter students based on selected class
  const filteredStudents = selectedClass
    ? searchForStudent.filter((student) => student.Class === selectedClass)
    : searchForStudent;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const selectedstudentFunc = (selectedStudentData) => {
    setStudentListView(false);
    setSelectedStudent(selectedStudentData);
    setStudentProfileVis(true);
  };

  const hideStudentProfilePage = () => {
    setStudentProfileVis(false);
    setStudentListView(true);
  };

  const handlePerPageChange = (e) => {
    setStudentsPerPage(Number(e.target.value));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenClassModal(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {studentListView && (
        <div className={styles.container}>
          <div className={styles.containerItems}>
            <div className={styles.containerHeader}>
              <div className={styles.portalName}>
                <h1>Teacher&apos;s Portal</h1>
              </div>

              <div className={styles.tableSearch}>
                <input
                  placeholder="Search for a student"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className={styles.userContainer}>
                <div className={styles.userProfile}>
                  <p>Profile</p>
                  <Person2 className={styles.userIcon} />
                </div>

                <div className={styles.userLogout} onClick={handleLogOut}>
                  <p>Logout</p>
                  <Logout className={styles.userIcon} />
                </div>
              </div>

              <div
                className={styles.menuBurger}
                onClick={() => setOpenModal(true)}
              >
                <Menu />
              </div>
            </div>
          </div>

          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>{user?.user?.displayName}</DialogTitle>
            <DialogContent>
              <IconButton onClick={handleLogOut}>Logout</IconButton>
            </DialogContent>
          </Dialog>

          <Dialog open={openClassModal} onClose={handleCloseClassModal}>
            <DialogTitle>Select Class</DialogTitle>
            <DialogContent>
              <FormControl fullWidth>
                <InputLabel>Select Class</InputLabel>
                <Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <MenuItem value="">All Classes</MenuItem>
                  {classArray.map((className, index) => (
                    <MenuItem key={index} value={className}>
                      {className}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
          </Dialog>

          <div className={styles.tableContainer}>
            <div className={styles.tableItems}>
              <div className={styles.tableHeader}>
                <h1>First Name</h1>
                <h1>Middle Name</h1>
                <h1>Last Name</h1>
                <h1>Class</h1>
                <h1>Student Number</h1>
              </div>

              {currentStudents.map((student, index) => (
                <div
                  className={styles.tableColumn}
                  key={index}
                  onClick={() => selectedstudentFunc(student)}
                >
                  <h1>{student.FirstName}</h1>
                  <h1>{student.MiddleName}</h1>
                  <h1>{student.LastName}</h1>
                  <h1>{student.Class}</h1>
                  <h1>{student.StudentNumber}</h1>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.containerLastSection}>
            <div className={styles.lastSectionItems}>
              <div className={styles.items}>
                <div className={styles.item1}>
                  <p>{filteredStudents.length}</p>
                  <h1>Students</h1>
                </div>

                <div className={styles.item2}>
                  <button
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        prevPage <
                        Math.ceil(filteredStudents.length / studentsPerPage)
                          ? prevPage + 1
                          : prevPage
                      )
                    }
                  >
                    Next
                  </button>
                  {Array.from(
                    {
                      length: Math.ceil(
                        filteredStudents.length / studentsPerPage
                      ),
                    },
                    (_, i) => (
                      <p
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={
                          currentPage === i + 1 ? styles.currentPage : ""
                        }
                      >
                        {i + 1}
                      </p>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        prevPage > 1 ? prevPage - 1 : prevPage
                      )
                    }
                  >
                    Prev
                  </button>
                </div>

                <div className={styles.item3}>
                  <select
                    value={studentsPerPage}
                    onChange={handlePerPageChange}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {studentProfileVis && (
        <StudentProfilePage
          selectedStudent={selectedStudent}
          hideStudentProfilePage={hideStudentProfilePage}
        />
      )}
    </>
  );
}

export default Index;


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
