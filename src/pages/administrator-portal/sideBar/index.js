import React, { useState } from "react";
import styles from "../../../styles/admin_portal_css/sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import CircularProgress from "@mui/material/CircularProgress";
import EventAvailable from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import Box from "@mui/material/Box";
import Dashboard from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sidebar() {
  const router = useRouter();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const goToThpDashboard = async () => {
    router.push("/administrator-portal");
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
          <div className={styles.loadingContainer}>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        </>
      )}

      <div className={styles.sideBarContainer}>
        <div className={styles.sideBarContents}>
          <div
            className={styles.sideBarLogoContainer}
            onClick={goToThpDashboard}
          >
            <div className={styles.logoContainer}>
              <Image
                src="/logo2.png"
                width={60}
                height={100}
                alt="juabenaps_logo"
                className={styles.logo}
              />
            </div>
          </div>

          <div className={styles.createContainer}>
            <AddCircleIcon className={styles.addIcon} />
            <Link
              href="/administrator-portal/admit-student/"
              className={styles.link}
            >
              Create Student
            </Link>{" "}
          </div>

          <div className={styles.lineContainer}>
            <hr className={styles.hr} />
          </div>

          <div className={styles.linkContainer}>
            <div className={styles.container_items_4_items}>
              <div className={styles.linkContent}>
                <Dashboard className={styles.linkIcon} />
                <Link href="/administrator-portal/" className={styles.link}>
                  Dashboard
                </Link>{" "}
              </div>

              <div className={styles.linkContent}>
                <PeopleIcon className={styles.linkIcon} />
                <Link href="/administrator-portal/student-list/" className={styles.link}>
                  Student&apos;s List
                </Link>
              </div>

              <div className={styles.linkContent}>
                <PeopleIcon className={styles.linkIcon} />
                <Link href="/administrator-portal/teachers-list/" className={styles.link}>
                  Teacher&apos;s List
                </Link>
              </div>

              <div className={styles.linkContent}>
                <PeopleIcon className={styles.linkIcon} />
                <Link
                  href="/administrator-portal/non-staff-list/"
                  className={styles.link}
                >
                  Non Teaching Staff
                </Link>
              </div>

              <div className={styles.linkContent}>
                <NotificationAddIcon
                  className={styles.linkIcon}
                />
                <Link
                  href="/administrator-portal/parent-notifications/"
                  className={styles.link}
                >
                  Parent&apos;s Notification
                </Link>
              </div>

              <div className={styles.linkContent}>
                <NotificationAddIcon
                  className={styles.linkIcon}
                />
                <Link
                  href="/administrator-portal/teachers-notifications/"
                  className={styles.link}
                >
                  Teacher&apos;s Notification
                </Link>
              </div>

              <div className={styles.linkContent}>
                <PaymentIcon className={styles.linkIcon} />
                <Link
                  href="/administrator-portal/set-student-fees/"
                  className={styles.link}
                >
                  Student&apos;s Fees
                </Link>
              </div>

              <div className={styles.linkContent}>
                <EventAvailable className={styles.linkIcon} />
                <Link
                  href="/administrator-portal/events/"
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
      <ToastContainer />
    </>
  );
}

export default Sidebar;
