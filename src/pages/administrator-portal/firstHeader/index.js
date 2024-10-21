import React, { useState } from "react";
import styles from "../../../styles/admin_portal_css/firstHeading.module.css";
import withSession from "@/lib/session";
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import SchoolImage from '../../../../public/logo2.png';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useRouter } from "next/router";


function FirstHeading({ setSearchQuery, searchQuery }) {
  const router = useRouter()
  const [openMenuContainer, setOpenMenuContainer] = useState(false);

  return (
    <>
      <div className={styles.firstHeaderContainer}>
        <div className={styles.firstHeaderContent}>
          <div className={styles.schoolLogoContainer}>
            <Image src={SchoolImage} width={900} height={900} alt="" />
          </div>

          <div className={styles.searchContainer}>
            <input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.profileContainer}>
            <div className={styles.academicYear}>
              <EventIcon className={styles.icon} />
              <h1>Academic Year : 2024 / 2025</h1>
            </div>

            <div className={styles.profilePhoto}>
              <PersonIcon className={styles.icon} />
              {openMenuContainer ? (
                <CloseIcon
                  className={styles.icon2}
                  onClick={() => setOpenMenuContainer(false)}
                />
              ) : (
                <MenuIcon
                  className={styles.icon2}
                  onClick={() => setOpenMenuContainer(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {openMenuContainer && (
        <>
          <div className={styles.menuContainer}>
            <div className={styles.menuContent}>
              <div className={styles.link} onClick={() => router.push("/administrator-portal/")}>
                <ArrowRightIcon className={styles.icon} />
                <h1>Dashboard</h1>
              </div>

              <div className={styles.link} onClick={() => router.push("/administrator-portal/register-teacher")}>
                <ArrowRightIcon className={styles.icon} />
                <h1>Add Teacher</h1>
              </div>

              <div className={styles.link} onClick={() => router.push("/administrator-portal/register-non-staff")}>
                <ArrowRightIcon className={styles.icon} />
                <h1>Add Non-Staff</h1>
              </div>


              <div className={styles.link} onClick={() => router.push("/administrator-portal/student-list")}>
                <ArrowRightIcon className={styles.icon} />
                <h1>Student&apos;s List</h1>
              </div>

              <div className={styles.link} onClick={() => router.push("/administrator-portal/teachers-list")}>
                <ArrowRightIcon className={styles.icon} />
                <h1>Teacher&apos;s List</h1>
              </div>

              <div className={styles.link} onClick={() => router.push("/administrator-portal/non-staff-list")}>
                <ArrowRightIcon className={styles.icon} />
                <h1>Non-staff List</h1>
              </div>

              <div className={styles.link} onClick={() => router.push("/administrator-portal/teachers-notifications")}>
                <ArrowRightIcon className={styles.icon} />
                <h1>T Notifications</h1>
              </div>

              <div className={styles.link} onClick={() => router.push("/administrator-portal/parents-notifications")}>
                <ArrowRightIcon className={styles.icon} />
                <h1>P Notifications</h1>
              </div>

              <div className={styles.link} onClick={() => router.push("/administrator-portal/events")}>
                <ArrowRightIcon className={styles.icon} />
                <h1>Events</h1>
              </div>

              <div className={styles.link} onClick={() => router.push("/administrator-portal/set-student-fees")}>
                <ArrowRightIcon className={styles.icon} />
                <h1>Fees</h1>
              </div>
            </div>
          </div>
        </>
      )}
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
