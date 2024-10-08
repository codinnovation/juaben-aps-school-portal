import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/admin_portal_css/firstHeading.module.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfilePhoto from '../../../../public/profile-photo (1).jpg'
import withSession from "@/lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventIcon from '@mui/icons-material/Event';
import Dashboard from "@mui/icons-material/Dashboard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Logout from "@mui/icons-material/Logout";
import Image from "next/image";
import PersonIcon from '@mui/icons-material/Person';

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
      <div className={styles.firstHeaderContainer}>
        <div className={styles.firstHeaderContent}>
          <div className={styles.searchContainer}>
            <input placeholder="Search" />
          </div>

          <div className={styles.profileContainer}>
            <div className={styles.academicYear}>
              <EventIcon className={styles.icon} />
              <h1>Academic Year : 2024 / 2025</h1>
            </div>

            <div className={styles.profilePhoto}>
              <PersonIcon className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
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
