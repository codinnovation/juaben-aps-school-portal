import React, { useState, useEffect } from "react";
import styles from "../../../styles/choose-portal/home-body.module.css";
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
          <div className={styles.recentActivities}>
            <div className={styles.recentActivitiesHeader}>
              <h1>Recent Activities</h1>
            </div>

            {recentActivities.map((activity, index) => (
              <div className={styles.recentCard} key={index}>
                <h1></h1>

                <div className={styles.recentCardTime}>
                  <h2>{activity?.time}</h2>
                  <p>3 Hours Ago</p>
                </div>

                <div className={styles.line}></div>

                <div className={styles.recentDetails}>
                  <h3>{activity?.recentDetails}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.pagesContainer}>
            <div className={styles.pagesContainerHeader}>
              <h1>Frequently Accessed Pages</h1>
            </div>

            <div className={styles.pagesCardContainer}>
              {storedPortal.map((portal, index) => (
                <div className={styles.pagesCard} key={index}>
                  <div className={styles.pagesCircle}>
                    <h1>{portal?.abbreviation}</h1>
                  </div>

                  <div className={styles.pagesCardName}>
                    <h1>{portal?.portalName}</h1>
                  </div>

                  <div className={styles.pagesCardTime}>
                    <h1>{portal?.time}</h1>
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
