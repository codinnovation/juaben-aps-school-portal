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
    classMaster: "",
    subjects: [],
    classToTeach: [],
    assignedClass: "",
  });

  const availableClasses = [
    "Creche",
    "K.G 1",
    "K.G 2",
    "Nursery 1",
    "Nursery 2",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
  ];

  const [teacherClass, setTeacherClass] = useState({
    "K.G 1 Teacher": [
      "Numeracy",
      "Language & Literacy",
      "Computing",
      "Creative Arts",
      "Literacy Writing",
      "Handwriting",
      "Numeracy Writing",
      "Colour Work"
    ],
    "K.G 2 Teacher": [
      "Numeracy",
      "Language & Literacy",
      "Computing",
      "Creative Arts",
      "Literacy Writing",
      "Handwriting",
      "Numeracy Writing",
      "Colour Work"
    ],
    "Creche Teacher": [
      "Scribbling & Colour",
      "Numeracy",
      "Language & Literacy",
      "Picture Reading",
      "Scribbling Work",
      "Numeracy Reading & Writing",
      "Literacy Reading & Writing"
    ],
    "Nursery 1 Teacher": [
      "Scribbling & Colour",
      "Numeracy",
      "Language & Literacy",
      "Picture Reading",
      "Scribbling Work",
      "Numeracy Reading & Writing",
      "Literacy Reading & Writing"
    ],
    "Nursery 2 Teacher": [
      "Scribbling & Colour",
      "Numeracy",
      "Language & Literacy",
      "Picture Reading",
      "Scribbling Work",
      "Numeracy Reading & Writing",
      "Literacy Reading & Writing"
    ],
    "Subject-Teacher": [
      "French",
      "Mathematics",
      "History",
      "English Language",
      "Science",
      "Writing Skills",
      "Creative Arts",
      "Ghanaian Language",
      "Religious & Moral Education",
      "Computing"
    ],
  });

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (createUser.assignedClass) {
      setSubjects(teacherClass[createUser.assignedClass] || []);

      setCreateUser((prevUser) => ({
        ...prevUser,
        subjects: [],
      }));
    }
  }, [createUser.assignedClass, teacherClass]);

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
      }, 1000);
      return;
    }

    let data = {
      email: createUser.email,
      password: createUser.password,
      displayName: `${createUser.classMaster} Teacher`,
    };

    let teacherData = {
      email: createUser.email,
      displayName: `${createUser.classMaster} Teacher`,
      subjects: createUser.subjects,
      classToTeach: createUser.classToTeach,
      assignedClass: createUser.assignedClass,
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
          `${user.displayName} created a new Teacher's account for Class: ${createUser.assignedClass} with Email: ${createUser.email}`
        );

        setTimeout(() => {
          router.push("/login");
        }, 1000);

        const newTeacherRef = push(ref(db, "usersTeachers"), teacherData);
        const newTeacherKey = newTeacherRef.key;
        return newTeacherKey;
      } else {
        toast.error("Create Failed");
      }
    } catch (error) {
      toast.error("Error Occurred");
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
        <div className={styles.loadingContainer}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
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
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={createUser.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.authFormInput}>
                <label>Class Master</label>
                <select
                  type="text"
                  id="classMaster"
                  name="classMaster"
                  required
                  value={createUser.classMaster}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Nursery 1">Nursery 1</option>
                  <option value="Nursery 2">Nursery 2</option>
                  <option value="Creche">Creche</option>
                  <option value="K.G 1">K. G 1</option>
                  <option value="K.G 2">K. G 2</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">Class 6</option>
                  <option value="Accountant">Accountant</option>
                </select>
              </div>

              <div className={styles.authFormInput}>
                <label>Class</label>
                <select
                  value={createUser.assignedClass}
                  onChange={handleInputChange}
                  name="assignedClass"
                  id="assignedClass"
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

              {createUser.assignedClass && (
                <>
                  <div className={styles.checkboxContainer}>
                    <h3>Select Subject to Teach</h3>
                    <div className={styles.checkboxContent}>
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

                  {createUser.assignedClass && (
                    <div className={styles.checkboxContainer}>
                      <h3>Select Class(es) to Teach</h3>
                      <div className={styles.checkboxContent}>
                        {availableClasses.map((className, index) => (
                          <div key={index}>
                            <input
                              type="checkbox"
                              id={`class-${index}`}
                              value={className}
                              checked={createUser.classToTeach.includes(
                                className
                              )}
                              onChange={(e) => {
                                const { value, checked } = e.target;
                                setCreateUser((prevUser) => {
                                  const updatedClasses = checked
                                    ? [...prevUser.classToTeach, value]
                                    : prevUser.classToTeach.filter(
                                      (cls) => cls !== value
                                    );
                                  return {
                                    ...prevUser,
                                    classToTeach: updatedClasses,
                                  };
                                });
                              }}
                            />
                            <label htmlFor={`class-${index}`}>
                              {className}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
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
