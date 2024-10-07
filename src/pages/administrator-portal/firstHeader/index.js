import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/admin_portal_css/firstHeading.module.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import withSession from "@/lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "@mui/icons-material/Dashboard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Logout from "@mui/icons-material/Logout";


function FirstHeading() {
  const router = useRouter();
  const [isButtonClicked, setIsButtonClicked] = useState(false);


  const handleLogout = async (e) => {
    setIsButtonClicked(true);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
;

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
      <div className={styles.firstHeaderContainer}>
        <div className={styles.firstHeaderContent}>
          <div className={styles.contentOne}>
            <Dashboard className={styles.icon} />
            <h1>Administrator Portal</h1>
          </div>

          <div className={styles.contentTwo}>
            <NotificationsNoneIcon className={styles.icon} />
            <PermIdentityIcon className={styles.icon} />
            <SettingsIcon className={styles.icon} />
            <Logout className={styles.icon} onClick={handleLogout} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default FirstHeading;

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
