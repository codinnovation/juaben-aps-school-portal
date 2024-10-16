import React from "react";
import styles from "../../../styles/admin_portal_css/firstHeading.module.css";
import withSession from "@/lib/session";
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';

function FirstHeading({setSearchQuery, searchQuery}) {
  return (
    <>
      <div className={styles.firstHeaderContainer}>
        <div className={styles.firstHeaderContent}>
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
