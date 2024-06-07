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

    if (user?.user?.displayName !== "Administrator") {
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
          router.push("/");
        }, 2000);
        setIsButtonClicked(false);
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

      <div className={styles.container}>
        <div className={styles.container_items}>
          <div className={styles.container_login}>
            <h2>Create an account</h2>
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
                  value={createUser.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.container_form_input}>
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
                  <option value="Teacher">Teacher</option>
                  <option value="Parent">Parent</option>
                </select>
              </div>

              <div className={styles.container_form_input}>
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
                <Link href="/choose_portal" className={styles.link}>
                  Choose Another Portal
                </Link>
              </div>

              <button type="submit" className={styles.login_btn}>
                Create Account
              </button>
            </form>
          </div>
        </div>
        <div className={styles.footer_container}>
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
  if (!user || !user?.user?.emailVerified) {
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
