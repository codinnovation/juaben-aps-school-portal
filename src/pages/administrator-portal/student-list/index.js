import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import styles from "../../../styles/admin_portal_css/studentList.module.css";
import { auth, db } from "../../../lib/firebase";
import { ref, get } from "firebase/database";
import StudentProfilePageComponent from "../student-profile/profile";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Layout from "../layout";
import withSession from "@/lib/session";

function StudentList() {
  const [studentProfilePageView, setStudentProfilePageView] = useState(false);
  const [studentListView, setStudentListView] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // Handle change in the number of students per page
  const handlePerPageChange = (e) => setStudentsPerPage(Number(e.target.value));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dbRef = ref(db, "japsstudents");
        const response = await get(dbRef);
        const data = response.val();

        if (data) {
          const formattedData = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          setStudentData(formattedData);
        } else {
          setStudentData([]);
        }
      } catch (error) {
        console.error("Error fetching data:");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter student data based on search query
  const filteredStudents = useMemo(() => {
    return studentData.filter(
      (student) =>
        student.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.MiddleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.StudentNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [studentData, searchQuery]);

  // Handle pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showStudentProfilePage = (student) => {
    setSelectedStudent(student);
    setStudentListView(false);
    setStudentProfilePageView(true);
  };

  const hideStudentProfilePage = () => {
    setStudentProfilePageView(false);
    setStudentListView(true);
  };

  return (
    <>
      {isLoading && (
        <div className={styles.isLoadingContainer}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        </div>
      )}


      {!isLoading && (
        <Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
           <Head>
        <title>Juaben APS - Student List</title>
        <meta name="description" content="Juaben APS School Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2.png" />
      </Head>

          {studentListView && (
            <div className={styles.studentListContainer}>
              <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                  <h1>First Name</h1>
                  <h1>Middle Name</h1>
                  <h1>Last Name</h1>
                  <h1>Class</h1>
                  <h1>Gender</h1>
                  <h1>Student Number</h1>
                </div>

                {currentStudents.map((student, index) => (
                  <div
                    className={styles.tableColumn}
                    key={index}
                    onClick={() => showStudentProfilePage(student)}
                  >
                    <h1>{student.FirstName}</h1>
                    <h1>{student.MiddleName}</h1>
                    <h1>{student.LastName}</h1>
                    <h1>{student.Class}</h1>
                    <h1>{student.Gender}</h1>
                    <h1>{student.StudentNumber}</h1>
                  </div>
                ))}
              </div>

              <div className={styles.paginationContainer}>
                <div className={styles.paginationItems}>
                  <div className={styles.totalMembers}>
                    <p>{filteredStudents.length}</p>
                    <h1>Students</h1>
                  </div>

                  <div className={styles.navigation}>
                    <button
                      onClick={() =>
                        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))
                      }
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) =>
                      i < 3 || i === totalPages - 1 ? (
                        <p
                          key={i + 1}
                          onClick={() => paginate(i + 1)}
                          className={currentPage === i + 1 ? styles.currentPage : ""}
                        >
                          {i + 1}
                        </p>
                      ) : i === 3 ? (
                        <span key="ellipsis">...</span>
                      ) : null
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((prevPage) =>
                          prevPage < totalPages ? prevPage + 1 : prevPage
                        )
                      }
                    >
                      Next
                    </button>
                  </div>

                  <div className={styles.displayNumRow}>
                    <select value={studentsPerPage} onChange={handlePerPageChange}>
                      {[10, 20, 30, 40, 50, 100, 150, 200, 300, 400].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {studentProfilePageView && (
            <StudentProfilePageComponent
              hideStudentProfilePage={hideStudentProfilePage}
              selectedStudent={selectedStudent}
            />
          )}
        </Layout>
      )}
    </>
  );
}

export default StudentList;

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
