import React, { useState } from "react";
import Head from "next/head";
import styles from "../../styles/login.module.css";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from ".././../lib/firebase";


function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
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
        toast.success("Login successful");
        setIsSubmitting(false);
        router.push("/")
      } else {
        toast.error("Login Failed");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Error Occurred");
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const resetPassword = async () => {
    if(!userCredentials.email){
      toast.error("Please enter your email address")
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
            <div className={styles.loadingCircle}></div>
            <span>Please wait...</span>
          </div>
        </>
      )}
      <Head>
        <title>Please Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.authContainer}>
        <div className={styles.authItems}>
          <div className={styles.authLogin}>
            <h2>Login to your account</h2>
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
                  value={userCredentials.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.authFormInput}>
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={userCredentials.password}
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
                <a onClick={resetPassword}>Forget Password</a>
              </div>

              <button type="submit" className={styles.loginButton}>
                Login
              </button>
            </form>
          </div>
        </div>
        <div className={styles.footerContainer}>
          <p>
            &copy;{new Date().getFullYear()} - Juaben APS | All Rights
            Reserved
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginForm;