import React, { useEffect, useState } from "react";
import styles from "../../../styles/accountant_portal/studentList.module.css";
import { auth, db } from "../../../lib/firebase";
import { ref } from "firebase/database";
import { get } from "firebase/database";
import Layout from "../layout";
import { useRouter } from "next/router";
import StudentFees from "../student-profile/fees";
import withSession from "@/lib/session";

function StudentList({ user }) {
  const [studentProfilePageView, setStudentProfilePageView] = useState(false);
  const [studentListView, setStudentListView] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(12);

  console.log(user);

  const handlePerPageChange = (e) => {
    setStudentsPerPage(Number(e.target.value));
  };

  const router = useRouter();

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

  const showStudentProfilePage = (rowData) => {
    setSelectedStudent(rowData);
    setStudentListView(false);
    setStudentProfilePageView(true);
  };

  const hideStudentProfilePage = () => {
    setStudentProfilePageView(false);
    setStudentListView(true);
  };

  const searchForStudent = studentData.filter(
    (student) =>
      student.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.MiddleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.StudentNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = searchForStudent.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(searchForStudent.length / studentsPerPage);

  return (
    <>
      <Layout>
        {studentListView && (
          <div className={styles.studentListContainer}>
            <div className={styles.searchStudent}>
              <input
                placeholder="Search for a student"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <h1>First Name</h1>
                <h1>Middle Name</h1>
                <h1>Last Name</h1>
                <h1>Grade</h1>
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
                  <p>{searchForStudent.length}</p>
                  <h1>Students</h1>
                </div>

                <div className={styles.navigation}>
                  <button
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        prevPage > 1 ? prevPage - 1 : prevPage
                      )
                    }
                  >
                    Prev
                  </button>
                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, i) =>
                      i < 3 || i === totalPages - 1 ? (
                        <p
                          key={i + 1}
                          onClick={() => paginate(i + 1)}
                          className={
                            currentPage === i + 1 ? styles.currentPage : ""
                          }
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
                  <select
                    value={studentsPerPage}
                    onChange={handlePerPageChange}
                  >
                    <option value={13}>13</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                    <option value={60}>60</option>
                    <option value={70}>70</option>
                    <option value={80}>80</option>
                    <option value={90}>90</option>
                    <option value={100}>100</option>
                    <option value={150}>150</option>
                    <option value={200}>200</option>
                    <option value={300}>300</option>
                    <option value={400}>400</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {studentProfilePageView && (
          <StudentFees
            selectedStudent={selectedStudent}
            user={user}
            hideStudentProfilePage={hideStudentProfilePage}
          />
        )}
      </Layout>
    </>
  );
}

export default StudentList;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (!user || !user || !user.displayName.includes("Accountant")) {
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
      user: user,
    },
  };
});
