import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../styles/login.module.css";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import withSession from "@/lib/session";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "@/lib/firebase";
import { push, ref } from "firebase/database";

function Index({ user }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const router = useRouter();

  const [createUser, setCreateUser] = useState({
    email: "",
    password: "",
    role: "",
    subjects: [], // New field to hold selected subjects
  });

  const [teacherClass, setTeacherClass] = useState({
    "Teacher-K.G 1": [
      "English Literacy",
      "Creative Art",
      "Phonics Writing",
      "Copy & Picture Reading",
      "Numeracy",
    ],
    "Teacher-K.G 2": [
      "English Literacy",
      "Creative Art",
      "Phonics Writing",
      "Copy & Picture Reading",
      "Numeracy",
    ],
    "Teacher-Creche": [
      "Copy & Picture Reading",
      "Phonics Colouring",
      "Numeracy",
      "Phonics Writing",
    ],
    "Teacher-Nursery 1": [
      "Copy & Picture Reading",
      "Phonics Colouring",
      "Numeracy",
      "Phonics Writing",
    ],
    "Teacher-Nursery 2": [
      "Copy & Picture Reading",
      "Phonics Colouring",
      "Numeracy",
      "Phonics Writing",
    ],
    "Teacher-Class 1": [
      "English",
      "Science",
      "Creative Art",
      "RME",
      "AsanteTWI",
      "Mathematics",
      "French",
      "Computer",
      "OWOP",
    ],
    "Teacher-Class 2": [
      "English",
      "Science",
      "Creative Art",
      "RME",
      "AsanteTWI",
      "Mathematics",
      "French",
      "Computer",
      "OWOP",
    ],
    "Teacher-Class 3": [
      "English",
      "Science",
      "Creative Art",
      "RME",
      "AsanteTWI",
      "Mathematics",
      "French",
      "Computer",
      "OWOP",
    ],
    "Teacher-Class 4": [
      "English",
      "Science",
      "Creative Art",
      "RME",
      "AsanteTWI",
      "Mathematics",
      "French",
      "Computer",
      "OWOP",
    ],
    "Teacher-Class 5": [
      "English",
      "Science",
      "Creative Art",
      "RME",
      "AsanteTWI",
      "Mathematics",
      "French",
      "Computer",
      "OWOP",
    ],
    "Teacher-Class 6": [
      "English",
      "Science",
      "Creative Art",
      "RME",
      "AsanteTWI",
      "Mathematics",
      "French",
      "Computer",
      "OWOP",
    ],
    "Teacher 1 Subject": ["French", "Computer"],
  });

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (createUser.role) {
      setSubjects(teacherClass[createUser.role] || []);
      // Reset selected subjects if the class changes
      setCreateUser((prevUser) => ({
        ...prevUser,
        subjects: [],
      }));
    }
  }, [createUser.role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCreateUser((prevUser) => {
      const updatedSubjects = checked
        ? [...prevUser.subjects, value]
        : prevUser.subjects.filter((subject) => subject !== value);

      return {
        ...prevUser,
        subjects: updatedSubjects,
      };
    });
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
      role: createUser.role,
    };

    let teacherData = {
      email: createUser.email,
      password: createUser.password,
      role: createUser.role,
      subjects: createUser.subjects,
    };
    try {
      const response = await fetch("/api/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Account created successfully");
        toast.success(`Email verification sent to ${createUser.email}`);
        handleAddCreateParentActivity(
          `${user.displayName} created a new Teacher's account for Class: ${createUser.role} with Email: ${createUser.email}`
        );

        setTimeout(() => {
          setIsButtonClicked(true);
          router.push("/login");
        }, 1000);
        setIsButtonClicked(false);

        const newTeacherRef = push(ref(db, "usersTeachers"), teacherData);
        const newTeacherKey = newTeacherRef.key;
        return newTeacherKey;
      } else {
        toast.error("Create Failed");
        setIsButtonClicked(false);
      }
    } catch (error) {
      toast.error("Error Occurred");
      setIsButtonClicked(false);
    } finally {
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
        <>
          <div className={styles.loadingContainer}>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        </>
      )}
      <Head>
        <title>Please Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.authContainer}>
        <div className={styles.authItems}>
          <div className={styles.authLogin}>
            <h2>Create an account for Teacher</h2>
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
                <label>Class</label>
                <select
                  value={createUser.role}
                  onChange={handleInputChange}
                  name="role"
                  id="role"
                >
                  <option value="" disabled>
                    Select Class
                  </option>
                  {Object.keys(teacherClass).map((classKey) => (
                    <option key={classKey} value={classKey}>
                      {classKey}
                    </option>
                  ))}
                </select>
              </div>

              {createUser.role && (
                <div className={styles.checkboxContainer}>
                  <div>
                    {subjects.map((subject, index) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          id={`subject-${index}`}
                          value={subject}
                          checked={createUser.subjects.includes(subject)}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor={`subject-${index}`}>{subject}</label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
