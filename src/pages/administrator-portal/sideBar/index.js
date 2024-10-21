import React from "react";
import styles from "../../../styles/admin_portal_css/sidebar.module.css";
import Image from "next/image";
import LogoImage from '../../../../public/logo2.png';
import { useRouter } from "next/router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import withSession from "@/lib/session";


function Sidebar() {
  const router = useRouter()

  return (
    <>
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebarContent}>
          <div className={styles.firstContent}>

            <div className={styles.schoolLogo}>
              <Image src={LogoImage} width={900} height={900} alt="" />
              <div className={styles.iconContainer}>
                <DashboardIcon className={styles.icon} onClick={() => router.push('/administrator-portal/')} />
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

              <div className={styles.linkContainer} onClick={() => router.push("/administrator-portal/register-teacher")}>
                <PeopleIcon className={styles.icon} />
                <h1>Add Teacher</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer} onClick={() => router.push("/administrator-portal/register-non-staff")}>
                <PeopleIcon className={styles.icon} />
                <h1>Add Non-staff</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer} onClick={() => router.push("/administrator-portal/student-list")}>
                <PeopleIcon className={styles.icon} />
                <h1>Student&apos;s List</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer} onClick={() => router.push('/administrator-portal/teachers-list')}>
                <PeopleOutlineIcon className={styles.icon} />
                <h1>Teacher&apos;s List</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer} onClick={() => router.push('/administrator-portal/non-staff-list')}>
                <PeopleOutlineIcon className={styles.icon} />
                <h1>Non-Staff List</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer} onClick={() => router.push("/administrator-portal/teachers-notifications")}>
                <NotificationsNoneIcon className={styles.icon} />
                <h1>T Notifications</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer} onClick={() => router.push('/administrator-portal/parent-notifications')}>
                <NotificationsIcon className={styles.icon} />
                <h1>P Notifications</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer} onClick={() => router.push('/administrator-portal/events')}>
                <EmojiEventsIcon className={styles.icon} />
                <h1>Events</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer} onClick={() => router.push("/administrator-portal/set-student-fees")}>
                <AttachMoneyIcon className={styles.icon} />
                <h1>Fees</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

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
