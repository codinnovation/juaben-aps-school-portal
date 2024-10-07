import React, { useEffect, useState } from "react";
import Head from 'next/head'
import styles from "../../../styles/admin_portal_css/nonstafflist.module.css";
import {  db } from "../../../lib/firebase";
import { ref } from "firebase/database";
import { get } from "firebase/database";
import Layout from "../layout";

function StudentList() {
  const [teacherListView, setTeacherListView] = useState(true);
  const [teachersData, setTeacherData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage, setTeachersPerPage] = useState(10);

  const handlePerPageChange = (e) => {
    setStudentsPerPage(Number(e.target.value));
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "japsworkers");
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
    (student) =>
      student.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.MiddleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.LastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastStudent = currentPage * teachersPerPage;
  const indexOfFirstStudent = indexOfLastStudent - teachersPerPage;
  const currentStudents = searchForTeacher.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
     
        <>
          <Layout>
          <Head>
              <title>Juaben APS - Teachers List</title>
              <meta name="description" content="Generated by create next app" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            {teacherListView && (
              <div className={styles.teacherListContainer}>
                <div className={styles.searchTeacher}>
                  <input
                    placeholder="Search for..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className={styles.tableContainer}>
                  <div className={styles.tableHeader}>
                    <h1>First Name</h1>
                    <h1>Middle Name</h1>
                    <h1>Last Name</h1>
                    <h1>Phone Number</h1>
                    <h1>Gender</h1>
                    <h1>Position</h1>
                    <h1>Date Of Appointment</h1>
                  </div>

                  {currentStudents.map((student, index) => (
                    <div className={styles.tableColumn} key={index}>
                      <h1>{student.FirstName}</h1>
                      <h1>{student.MiddleName}</h1>
                      <h1>{student.LastName}</h1>
                      <h1>{student.WorkerPhone}</h1>
                      <h1>{student.Gender}</h1>
                      <h1>{student.Position}</h1>
                      <h1>{student.DateOfAppointment}</h1>
                    </div>
                  ))}
                </div>

                <div className={styles.paginationContainer}>
                  <div className={styles.paginationItems}>
                    <div className={styles.totalMembers}>
                      <p>{searchForTeacher.length}</p>
                      <h1>workers</h1>
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
                            Math.ceil(searchForStudent.length / studentsPerPage)
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
    
    </>
  );
}

export default StudentList;
