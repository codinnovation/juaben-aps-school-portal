import React from "react";
import styles from "../../../styles/admin_portal_css/firstHeading.module.css";
import withSession from "@/lib/session";
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";
import SchoolImage from '../../../../public/logo2.png'

function FirstHeading({ setSearchQuery, searchQuery }) {
  return (
    <>
      <div className={styles.firstHeaderContainer}>
        <div className={styles.firstHeaderContent}>
          <div className={styles.schoolLogoContainer}>
            <Image src={SchoolImage} width={900} height={900} alt="" />
          </div>
          <div className={styles.searchContainer}>
            <input placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className={styles.profileContainer}>
            <div className={styles.academicYear}>
              <EventIcon className={styles.icon} />
              <h1>Academic Year : 2024 / 2025</h1>
            </div>

            <div className={styles.profilePhoto}>
              <PersonIcon className={styles.icon} />
              <MenuIcon className={styles.icon2} />
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
