import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../../../styles/teachers_portal_css/studentList.module.css";
import { auth, db } from "../../../lib/firebase";
import { ref } from "firebase/database";
import { get } from "firebase/database";
import StudentProfilePageComponent from "../studentProfile/studentProfilePage";
import LogoutIcon from "@mui/icons-material/Logout";
import Layout from "../layout";
import { useRouter } from "next/router";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import Dashboard from "@mui/icons-material/Dashboard";
import NotificationAdd from "@mui/icons-material/NotificationAdd";
import EventIcon from "@mui/icons-material/Event";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withSession from "@/lib/session";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import EventAvailable from "@mui/icons-material/EventAvailable";

function StudentList() {
  const [studentProfilePageView, setStudentProfilePageView] = useState(false);
  const [studentListView, setStudentListView] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(13);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [user, setUser] = useState(null);

  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
      }
    };

    fetchUser();
  }, []);

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

          const teacherClass = user?.displayName
            ?.replace("Teacher-", "")
            .replace("-", " ");
          const filteredStudents = dataArray.filter(
            (student) => student.Class === teacherClass
          );
          setStudentData(filteredStudents);
        } else {
          setStudentData([]);
        }
      } catch (error) {
        console.error("Error fetching data:");
        setStudentData([]);
      }
    };

    fetchData();
  }, [user]);

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
    <Layout>
      {isButtonClicked && (
        <>
          <div className={styles.circle_container}>
            <div className={styles.circle}></div>
            <span>Logging out...</span>
          </div>
        </>
      )}
      <Head>
        <title>Juaben APS - Student List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {studentListView && (
        <div className={styles.studentListContainer}>
          <div className={styles.searchStudent}>
            <h1>Teacher&apos;s Portal</h1>

            <input
              placeholder="Search for a student"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.menuIconContainer}>
            <div className={styles.link}>
              <Dashboard className={styles.icon} />
              <h1>Dashboard</h1>
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
                <select value={studentsPerPage} onChange={handlePerPageChange}>
                  <option value={10}>10</option>
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
      <ToastContainer />

      {studentProfilePageView && (
        <StudentProfilePageComponent
          hideStudentProfilePage={hideStudentProfilePage}
          selectedStudent={selectedStudent}
        />
      )}
    </Layout>
  );
}

export default StudentList;

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
