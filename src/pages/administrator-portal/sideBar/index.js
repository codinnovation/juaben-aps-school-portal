import React, { useState } from "react";
import styles from "../../../styles/admin_portal_css/sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import LogoImage from '../../../../public/logo2.png';
import { useRouter } from "next/router";
import LockIcon from '@mui/icons-material/Lock';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CampaignIcon from '@mui/icons-material/Campaign';
import SchoolIcon from '@mui/icons-material/School';
import Dashboard from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebarContent}>
          <div className={styles.contentOne}>
            <div className={styles.logoContainer}>
              <Image src={LogoImage} width={900} height={900} alt="" />
              <h1>Administrator Portal</h1>
            </div>

            <div className={styles.sidebarLinks}>
              <div className={styles.linkContainer}>
                <Dashboard className={styles.icon} />
                <Link href="/administrator-portal">Dashboard</Link>
              </div>

              <div className={styles.linkContainer}>
                <AddCircleIcon className={styles.icon} />
                <Link href="/administrator-portal/admit-student">Create Student</Link>
              </div>

              <div className={styles.linkContainer}>
                <SchoolIcon className={styles.icon} />
                <Link href="/administrator-portal/student-list">Student&apos;s List</Link>
              </div>

              <div className={styles.linkContainer}>
                <SchoolIcon className={styles.icon} />
                <Link href="/administrator-portal/teachers-list">Teacher&apos;s List</Link>
              </div>

              <div className={styles.linkContainer}>
                <NotificationsNoneIcon className={styles.icon} />
                <Link href="/administrator-portal/teachers-notifications">T. Notification</Link>
              </div>

              <div className={styles.linkContainer}>
                <NotificationsActiveIcon className={styles.icon} />
                <Link href="/administrator-portal/parent-notifications">P. Notification</Link>
              </div>


              <div className={styles.linkContainer}>
                <CampaignIcon className={styles.icon} />
                <Link href="/administrator-portal/events">Events</Link>
              </div>
            </div>
          </div>

          <div className={styles.contentTwo}>
            <div className={styles.signOutButton} onClick={handleLogout}>
              <LockIcon className={styles.icon} />
              <h1>Sign Out</h1>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Sidebar;
