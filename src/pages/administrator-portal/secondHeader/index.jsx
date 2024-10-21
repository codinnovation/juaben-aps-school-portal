import React, { useState, useEffect } from "react";
import styles from "../../../styles/admin_portal_css/secondHeader.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import withSession from "@/lib/session";

function SecondHeader() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await fetch("/api/user", {});

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };

    fetchUserSession();
  }, []);

  const handleLogout = async (e) => {
    setIsButtonClicked(true);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
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
      <div className={styles.secondHeaderContainer}>
        <div className={styles.secondHeaderContent}>
          <div className={styles.dashboardName}>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user?.email}</p>
          </div>

          <div className={styles.studentInfoContainer}>
            <h1
              onClick={() => router.push("/administrator-portal/admit-student")}
            >
              Add Student
            </h1>
            <h1 onClick={handleLogout}>Logout</h1>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default SecondHeader;

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
