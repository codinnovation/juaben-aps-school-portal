import React, { useState, useEffect } from "react";
import styles from "../../../styles/choose-portal/home-body.module.css";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import withSession from "@/lib/session";

function Index() {
  const [storedPortal, setStoredPortal] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const activity =
      JSON.parse(localStorage.getItem("japsRecentActivity")) || [];
    setRecentActivities(activity);
  }, []);

  useEffect(() => {
    const portals = JSON.parse(localStorage.getItem("selectedPortals")) || [];
    setStoredPortal(portals);
  }, []);

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <div className={styles.activitiesContainer}>
            <div className={styles.activitiesHeader}>
              <LocalActivityIcon className={styles.icon} />
              <h1>Recent Activities</h1>
            </div>

            <div className={styles.activityBoxContainer}>
              {recentActivities.slice(0, 5).map((page, index) => (
                <div className={styles.activityBox} key={index}>
                  <div className={styles.timeContainer}>
                    <p>{page?.time}</p>
                  </div>

                  <hr className={styles.line} />

                  <div className={styles.activityDescription}>
                    <p>{page?.recentDetails}</p>
                  </div>
                </div>
              ))}

            </div>

          </div>
          <div className={styles.recentpageContainer}>
            <div className={styles.recentpageHeader}>
              <LocalActivityIcon className={styles.icon} />
              <h1>Frequent Pages</h1>
            </div>

            <div className={styles.recentBoxContainer}>
              {storedPortal.slice(0, 5).map((page, index) => (
                <div className={styles.recentBox} key={index}>
                  <div className={styles.recentpageName}>
                    <h1>{page?.abbreviation}</h1>
                  </div>

                  <div className={styles.recentBoxName}>
                    <h1>{page?.portalName}</h1>
                  </div>

                  <div className={styles.recentBoxTime}>
                    <p>{page?.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;

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
