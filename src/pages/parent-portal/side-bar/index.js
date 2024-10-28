import React from "react";
import styles from "../../../styles/admin_portal_css/sidebar.module.css";
import Image from "next/image";
import LogoImage from '../../../../public/logo2.png';
import { useRouter } from "next/router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
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
                <DashboardIcon className={styles.icon} onClick={() => router.push('/parent-portal/')} />
              </div>
            </div>

            <div className={styles.schoolName}>
              <h1>Nana Akosua Akyamaah || Preparatory School</h1>
            </div>

            <div className={styles.createStudent}>
              <DashboardIcon className={styles.icon} />
              <h1>Parent&apos;s Portal</h1>
            </div>

            <div className={styles.navigationLinkContainer}>
              <div className={styles.linkContainer} onClick={() => router.push('/parent-portal/parent-notifications')}>
                <NotificationsIcon className={styles.icon} />
                <h1>Notifications</h1>
                <ArrowRightIcon className={styles.icon2} />
              </div>

              <div className={styles.linkContainer} onClick={() => router.push('/parent-portal/events')}>
                <EmojiEventsIcon className={styles.icon} />
                <h1>Events</h1>
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
