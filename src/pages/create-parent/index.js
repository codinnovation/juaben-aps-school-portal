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
import LinearProgress from "@mui/material/LinearProgress";
import withSession from "@/lib/session";
import { db } from "@/lib/firebase";
import { ref } from "firebase/database";

function Index({ user }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [studentData, setStudentData] = useState([]);
  const router = useRouter();

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
      }else

    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
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
    };

    try {
      const response = await fetch("/api/create-parent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Account created successful");
        toast.success(`Email verification sent to ${createUser.email}`);

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
      toast.error("Error Occurred");
      setIsButtonClicked(false);
    } finally {
      setIsButtonClicked(false);
    }
  };

  return (
    <>
      {isButtonClicked && (
        <>
          <div className={styles.loadingContainer}>
            <Box sx={{ width: "70%" }}>
              <LinearProgress variant="determinate" value={progress} />
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
                  onChange={handleInputChange}
                  type="number"
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
                <Link href="/choose_portal" className={styles.link}>
                  Choose Another Portal
                </Link>
              </div>

              <button type="submit" className={styles.loginBtn}>
                Create Account
              </button>
            </form>
          </div>
        </div>
        <div className={styles.footerContainer}>
          <p>
            &copy;{new Date().getFullYear()} - Juaben APS | All Rights Reserved
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Index;

// export const getServerSideProps = withSession(async function ({ req, res }) {
//   const user = req.session.get("user");
//   if (!user || user?.displayName !== "Administrator") {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
//   if (user) {
//     req.session.set("user", user);
//     await req.session.save();
//   }

//   return {
//     props: {
//       user: user,
//     },
//   };
// });
