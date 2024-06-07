import React, { useEffect, useState } from "react";
import styles from "../../../styles/admin_portal_css/teachers.module.css";
import { auth, db } from "../../../lib/firebase";
import { ref } from "firebase/database";
import { get } from "firebase/database";
import Layout from "../layout";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/SearchOutlined";


function StudentList() {
  const [teacherListView, setTeacherListView] = useState(true);
  const [teachersData, setTeacherData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage, setTeachersPerPage] = useState(10);
  const [searchInputClicked, setSearchInputClicked] = useState(false);


  const handlePerPageChange = (e) => {
    setTeachersPerPage(Number(e.target.value));
  };

  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "japsteachers");
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          setTeacherData(dataArray);
        } else {
          setStudentData([]);
        }
      } catch (error) {
        console.error("Error fetching data:");
        setTeacherData([]);
      }
    };

    fetchData();
  }, []);

  const searchForTeacher = teachersData.filter(
    (teacher) =>
      teacher.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.MiddleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.LastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastStudent = currentPage * teachersPerPage;
  const indexOfFirstStudent = indexOfLastStudent - teachersPerPage;
  const currentTeachers = searchForTeacher.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Layout>
        {teacherListView && (
          <div className={styles.teacherListContainer}>
              <div
            className={styles.searchTeacher}
            onClick={() => setSearchInputClicked(true)}
          >
            <span>Search</span>
            <SearchIcon />

            {searchInputClicked && (
              <>
                <div className={styles.searchInputContainer}>
                  <input
                    placeholder="Search for a Teacher"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <h1>First Name</h1>
                <h1>Middle Name</h1>
                <h1>Last Name</h1>
                <h1>Class Handle</h1>
                <h1>Phone Number</h1>
                <h1>Gender</h1>
                <h1>Date Of Appointment</h1>
                <h1>Qualification</h1>
              </div>

              {currentTeachers.map((student, index) => (
                <div className={styles.tableColumn} key={index}>
                  <h1>{student.FirstName}</h1>
                  <h1>{student.MiddleName}</h1>
                  <h1>{student.LastName}</h1>
                  <h1>{student.ClassToTeacher}</h1>
                  <h1>{student.TeacherPhone}</h1>
                  <h1>{student.Gender}</h1>
                  <h1>{student.DateOfAppointment}</h1>
                  <h1>{student.Qualification}</h1>
                </div>
              ))}
            </div>

            <div className={styles.paginationContainer}>
              <div className={styles.paginationItems}>
                <div className={styles.totalMembers}>
                  <p>{searchForTeacher.length}</p>
                  <h1>teachers</h1>
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
                      length: Math.ceil(
                        searchForTeacher.length / teachersPerPage
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
                        prevPage <
                        Math.ceil(searchForStudent.length / teachersPerPage)
                          ? prevPage + 1
                          : prevPage
                      )
                    }
                  >
                    Next
                  </button>
                </div>

                <div className={styles.displayNumRow}>
                  <select
                    value={teachersPerPage}
                    onChange={handlePerPageChange}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

export default StudentList;
