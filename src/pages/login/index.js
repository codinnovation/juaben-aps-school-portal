import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../styles/login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { auth } from ".././../lib/firebase";

function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // New state for "Remember Me"
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  // Automatically populate email from localStorage if "Remember Me" was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setUserCredentials((prev) => ({
        ...prev,
        email: savedEmail,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let data = {
      email: userCredentials.email,
      password: userCredentials.password,
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem("savedEmail", userCredentials.email);
        } else {
          localStorage.removeItem("savedEmail");
        }

        toast.success(`Welcome ${userCredentials.email}`);
        router.push("/");
      } else {
        toast.error("Login Failed, Enter valid credentials");
        setUserCredentials({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error("Login Failed");
      setUserCredentials({
        email: "",
        password: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPassword = async () => {
    if (!userCredentials.email) {
      toast.error("Please enter your email address");
    }
    try {
      await sendPasswordResetEmail(auth, userCredentials.email);
      toast.success("Password reset email sent. Please check your email.");
    } catch (error) {
      toast.error("Error sending password reset email");
    }
  };

  return (
    <>
      {isSubmitting && (
        <>
          <div className={styles.loadingContainer}>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        </>
      )}
      <Head>
        <title>Juaben APS - Please Log In</title>
        <meta name="description" content="Juaben APS - Log In" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2.png" />
      </Head>
      <div className={styles.loginContainer}>
        <div className={styles.loginContent}>
          <div className={styles.loginContentHeader}>
            <h1>Login</h1>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className={styles.inputField}>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={userCredentials.email}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.inputField}>
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={userCredentials.password}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.actionsContainer}>
              <div className={styles.rememberMe}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <p>Remember Me</p>
              </div>

              <div className={styles.forgetPassword}>
                <p onClick={resetPassword}>Forgot</p>
              </div>
            </div>

            <div className={styles.submitButton}>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default LoginForm;
