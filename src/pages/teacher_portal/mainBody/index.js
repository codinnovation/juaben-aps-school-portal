import React, { useEffect } from "react";
import styles from "../../../styles/teachers_portal_css/mainBody.module.css";
import NotificationsActive from "@mui/icons-material/NotificationsActive";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Logout from "@mui/icons-material/Logout";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/router";

function MainBody({user}) {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      router.push("/");
    } catch (error) {
      console.log("Error occur in signing out");
    }
  };

  function navToStudentList() {
    router.push({
      pathname: "/teacher_portal/studentList",
    });
  }

  function navToNotification() {
    router.push({
      pathname: "/teacher_portal/notification",
    });
  }

  function navToEvents() {
    router.push({
      pathname: "/teacher_portal/events",
    });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.boxes}>
            <div className={styles.box1} onClick={navToEvents}>
              <NotificationsActive className={styles.box1Icon} />
              <h1>Events</h1>
            </div>

            <div className={styles.box1} onClick={navToNotification}>
              <NotificationsActive className={styles.box1Icon} />
              <h1>Notifications</h1>
            </div>

            <div className={styles.box2} onClick={navToStudentList}>
              <FormatListBulletedIcon className={styles.box2Icon} />
              <h1>Student List</h1>
            </div>

            <div className={styles.box3} onClick={handleLogOut}>
              <Logout className={styles.box3Icon} />
              <h1>Logout</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBody;
