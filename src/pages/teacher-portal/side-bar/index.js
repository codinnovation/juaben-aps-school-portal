import React, { useState } from "react";
import styles from "../../../styles/teachers_portal_css/side-bar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import { auth } from "../../../lib/firebase";
import EventAvailable from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Dashboard from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function Sidebar() {
  const [userProfile, setUserProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const router = useRouter();

  const openUserProfile = () => {
    setUserProfile(true);
  };

  const closeUserProfile = () => {
    setUserProfile(false);
  };

  const goToThpDashboard = async () => {
    router.push("/");
  };

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
          <div className={styles.circle_container}>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        </>
      )}

      <div className={styles.container}>
        <div className={styles.container_items}>
          <div className={styles.container_items_1} onClick={goToThpDashboard}>
            <div className={styles.container_items_1_logo}>
              <Image
                src="/logo2.png"
                width={60}
                height={100}
                alt="juabenaps_logo"
                className={styles.logo}
              />
            </div>
          </div>

          <div className={styles.container_items_2}>
            <Link
              href="/teacher-portal/"
              className={styles.link}
            >
              Teacher&apos;s Portal
            </Link>{" "}
          </div>

          <div className={styles.container_items_3}>
            <hr className={styles.hr} />
          </div>

          <div className={styles.container_items_4}>
            <div className={styles.container_items_4_items}>
              <div className={styles.container_items_4_link}>
                <Dashboard className={styles.container_items_4_icon} />
                <Link href="/teacher-portal" className={styles.link}>
                  Dashboard
                </Link>{" "}
              </div>

              <div className={styles.container_items_4_link}>
                <NotificationAddIcon
                  className={styles.container_items_4_icon}
                />
                <Link
                  href="/teacher_portal/notification/"
                  className={styles.link}
                >
                  Teacher&apos;s Notification
                </Link>
              </div>

              <div className={styles.container_items_4_link}>
                <EventAvailable className={styles.container_items_4_icon} />
                <Link
                  href="/teacher_portal/events/"
                  className={styles.link}
                >
                  Events
                </Link>{" "}
              </div>
            </div>
          </div>

          <div className={styles.container_items_5} onClick={handleLogout}>
            <LogoutIcon />
            <h1>Logout</h1>
          </div>
        </div>
      </div>

      <Modal
        open={userProfile}
        onClose={closeUserProfile}
        className={styles.userProfileContainer}
      >
        <Box className={styles.userProfileBox}>
          <List className={styles.buttonLinks}>
            <ListItem className={styles.item}>
              {`First Name: ${user?.FirstName || "No First Name"}`}
            </ListItem>
            <ListItem className={styles.item}>
              {" "}
              {`Last Name: ${user?.lastName || "No Last Name"}`}
            </ListItem>
            <ListItem className={styles.item}>
              {" "}
              {`Email: ${user?.email || "No Email"}`}
            </ListItem>
            <ListItem className={styles.item}>
              {" "}
              {`Phone: ${user?.phoneNumber || "No Phone Number"}`}
            </ListItem>
          </List>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Sidebar;
