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


function Index() {
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsButtonClicked(true);

    let data = {
      email: user.email,
      password: user.password,
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
        setIsButtonClicked(false);
        router.push("/")
      } else {
        toast.error("Login Failed");
        setIsButtonClicked(false);
      }
    } catch (error) {
      toast.error("Error Occurred");
      setIsButtonClicked(false);
    } finally {
      setIsButtonClicked(false);
    }
  };

  
  const resetPassword = async () => {
   if(!email){
      toast.error("Please enter your email address")
   }
   try {
     await sendPasswordResetEmail(auth, email);
     toast.success("Password reset email sent. Please check your email.");
   } catch (error) {
     toast.error("Error sending password reset email");
   }
 };


  return (
    <>
      {isButtonClicked && (
        <>
          <div className={styles.circle_container}>
            <div className={styles.circle}></div>
            <span>Please wait...</span>
          </div>
        </>
      )}
      <Head>
        <title>Please Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.container_items}>
          <div className={styles.container_login}>
            <h2>Login to your account</h2>
          </div>

          <div className={styles.container_form}>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.container_form_input}>
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.container_form_input}>
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={user.password}
                  onChange={handleInputChange}
                />
                {showPassword ? (
                  <VisibilityOffOutlined
                    className={styles.VisibilityIcon}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <VisibilityOutlinedIcon
                    className={styles.VisibilityIcon}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>

              <div className={styles.container_forget_password}>
                <a onClick={resetPassword}>Forget Password</a>
              </div>

              <button type="submit" className={styles.login_btn}>
                Login
              </button>
            </form>
          </div>
        </div>
        <div className={styles.footer_container}>
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

export default Index;
