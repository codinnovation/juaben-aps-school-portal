import React, { useState } from "react";
import styles from "../../../styles/admin_portal_css/sidebar.module.css";
import Image from "next/image";
import LogoImage from '../../../../public/logo2.png';
import { useRouter } from "next/router";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import Dashboard from "@mui/icons-material/Dashboard";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


function Sidebar() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const router = useRouter();


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
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebarContent}>
          <div className={styles.firstContent}>

            <div className={styles.schoolLogo}>
              <Image src={LogoImage} width={900} height={900} alt="" />
              <div className={styles.iconContainer}>
                <ExitToAppIcon className={styles.icon} onClick={handleLogout} />
              </div>
            </div>

            <div className={styles.schoolName}>
              <h1>Nana Akosua Akyamaah || Preparatory School</h1>
            </div>

            <div className={styles.createStudent} onClick={() => router.push("/administrator-portal/admit-student")}>
              <AddCircleIcon className={styles.icon} />
              <h1>Add Student</h1>
            </div>

            <div className={styles.navigationLinkContainer}>

              <div className={styles.linkContainer}>
                <PeopleIcon className={styles.icon} />
                <h1>Add Teacher</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer}>
                <PeopleIcon className={styles.icon} />
                <h1>Add Non-staff</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer} onClick={() => router.push("/administrator-portal/student-list")}>
                <PeopleIcon className={styles.icon} />
                <h1>Student&apos;s List</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer}>
                <PeopleOutlineIcon className={styles.icon} />
                <h1>Teacher&apos;s List</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer}>
                <PeopleOutlineIcon className={styles.icon} />
                <h1>Non-Staff List</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer}>
                <NotificationsNoneIcon className={styles.icon} />
                <h1>T Notifications</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer}>
                <NotificationsIcon className={styles.icon} />
                <h1>P Notifications</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer}>
                <EmojiEventsIcon className={styles.icon} />
                <h1>Events</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Sidebar;
