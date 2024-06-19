import React, { useState } from "react";
import Head from "next/head";
import styles from "../../styles/login.module.css";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import withSession from "@/lib/session";

function Index({ user }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const router = useRouter();

  const [createUser, setCreateUser] = useState({
    email: "",
    password: "",
    role: "",
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
      return;
    }

    let data = {
      email: createUser.email,
      password: createUser.password,
      role: createUser.role,
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
        toast.success("Account created successful");
        toast.success(`Email verification sent to ${createUser.email}`);

        setTimeout(() => {
          router.push("/login");
        }, 1000);
        setIsButtonClicked(false);
      } else {
        toast.error(
          `Creating Failed: ${response.message || response.statusText}`
        );
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
          <div className={styles.circle_container}>
            <div className={styles.circle}></div>
            <span>Please wait...</span>
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
                <label>Role</label>
                <select
                  value={createUser.role}
                  onChange={handleInputChange}
                  placeholder="role"
                  name="role"
                  id="role"
                >
                  <option></option>
                  <option value="Administrator">Administrator</option>
                  <option value="Teacher-Creche">Teacher - Creche</option>
                  <option value="Teacher-Nursery-1">Teacher - Nursery 1</option>
                  <option value="Teacher-Nursery-2">Teacher - Nursery 2</option>
                  <option value="Teacher-K.G 1">Teacher - K.G 1</option>
                  <option value="Teacher-K.G 1">Teacher - K.G 2</option>
                  <option value="Teacher-Class-1">Teacher - Class 1</option>
                  <option value="Teacher-Class-2">Teacher - Class 2</option>
                  <option value="Teacher-Class-3">Teacher - Class 3</option>
                  <option value="Teacher-Class-4">Teacher - Class 4</option>
                  <option value="Teacher-Class-5">Teacher - Class 5</option>
                  <option value="Teacher-Class-6">Teacher - Class 6</option>
                </select>
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
