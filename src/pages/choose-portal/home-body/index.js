import React, { useState, useEffect } from "react";
import styles from "../../../styles/choose-portal/home-body.module.css";
import withSession from "@/lib/session";
import { motion } from 'framer-motion';

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
          <motion.div
            className={styles.recentActivities}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.recentActivitiesHeader}>
              <h1>Recent Activities</h1>
            </div>

            {recentActivities.slice(0, 4).map((activity, index) => (
              <motion.div
                className={styles.recentCard}
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={styles.recentCardTime}>
                  <h2>{activity?.time}</h2>
                  <p>3 Hours Ago</p>
                </div>

                <div className={styles.line}></div>

                <div className={styles.recentDetails}>
                  <h3>{activity?.recentDetails}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.pagesContainer}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.pagesContainerHeader}>
              <h1>Frequently Accessed Pages</h1>
            </div>

            <div className={styles.pagesCardContainer}>
              {storedPortal.map((portal, index) => (
                <motion.div
                  className={styles.pagesCard}
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={styles.pagesCircle}>
                    <h1>{portal?.abbreviation}</h1>
                  </div>

                  <div className={styles.pagesCardName}>
                    <h1>{portal?.portalName}</h1>
                  </div>

                  <div className={styles.pagesCardTime}>
                    <h1>{portal?.time}</h1>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
