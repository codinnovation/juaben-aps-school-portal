import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../styles/create-parent.module.css";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import withSession from "@/lib/session";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

function Index({ user }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  const [createUser, setCreateUser] = useState({
    email: "",
    password: "",
    studentNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsButtonClicked(true);

    if (user?.displayName !== "Administrator") {
      toast.error("You do not have permission to create user");
      setIsButtonClicked(false);
      setTimeout(() => {
        router.push("/login");
      }, 200);
      return;
    }

    let data = {
      email: createUser.email,
      password: createUser.password,
      studentNumber: createUser.studentNumber,
      role: `${createUser.studentNumber}`,
    };

    try {
      const response = await fetch("/api/create-parent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      handleAddCreateParentActivity(
        `${user.displayName} created a new parent account for Student ID: ${createUser.studentNumber} with Parent Email: ${createUser.email}`
      );

      if (response.ok) {
        toast.success("Account created successfully");

        setTimeout(() => {
          setIsButtonClicked(true);
          router.push("/login");
        }, 1000);
        setIsButtonClicked(false);
      } else {
        toast.error("Create Failed");
        setIsButtonClicked(false);
      }
    } catch (error) {
      console.log("Error occured catcg" + error);
      setIsButtonClicked(false);
    }
  };

  const handleAddCreateParentActivity = (recentDetails) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newActivity = { recentDetails, time };

    const storedActivity =
      JSON.parse(localStorage.getItem("japsRecentActivity")) || [];
    const updatedActivity = [newActivity, ...storedActivity];

    if (updatedActivity.length > 4) {
      updatedActivity.pop();
    }

    localStorage.setItem("japsRecentActivity", JSON.stringify(updatedActivity));
  };

  return (
    <>
      {isButtonClicked && (
        <div className={styles.loadingContainer}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      <Head>
        <title>Please Sign Up</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className={styles.authContainer}>
        <div className={styles.authItems}>
          <div className={styles.authLogin}>
            <h2>Create an account for Parent</h2>
          </div>

          <div className={styles.authForm}>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.authFormInput}>
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  value={createUser.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.authFormInput}>
                <label>Student Number</label>
                <input
                  value={createUser.studentNumber}
                  required
                  name="studentNumber"
                  onChange={handleInputChange}
                  type="text"
                />
              </div>

              <div className={styles.authFormInput}>
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={createUser.password}
                  onChange={handleInputChange}
                />
                {showPassword ? (
                  <VisibilityOffOutlined
                    className={styles.visibilityIcon}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <VisibilityOutlinedIcon
                    className={styles.visibilityIcon}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>

              <div className={styles.authForgetPassword}>
                <Link href="/choose-portal" className={styles.link}>
                  Choose Another Portal
                </Link>
              </div>

              <button type="submit" className={styles.loginBtn}>
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Index;

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
