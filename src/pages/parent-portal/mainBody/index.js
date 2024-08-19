import React from "react";
import styles from "../../../styles/parent_portal_css/mainBody.module.css";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import Logout from "@mui/icons-material/Logout";
import NotificationsActive from "@mui/icons-material/NotificationsActive";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useRouter } from "next/router";
import {auth} from '../../../lib/firebase'


function MainBody() {

  const router = useRouter()

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      router.push('/')
    } catch (error) {
      console.log("Error occur in signing out");
    }
  };

  
  function navToStudentProfile(){
    router.push({
      pathname: '/parent_portal/studentProfile/studentProfilePage'
    })
  }

  function navToNotification(){
    router.push({
      pathname: '/parent_portal/notification'
    })
  }

  
  function navToEvents() {
    router.push({
      pathname: "/parent_portal/events",
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

          <div className={styles.box2} onClick={navToStudentProfile}>
            <FormatListBulletedIcon className={styles.box2Icon} />
            <h1>my Student</h1>
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
