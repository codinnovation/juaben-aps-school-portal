import React from "react";
import styles from "../../../styles/choose-portal/home-body.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Index() {
  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <div className={styles.recentActivities}>
            <div className={styles.recentActivitiesHeader}>
              <h1>Recent Activities</h1>
            </div>

            <div className={styles.recentCard}>
              <h1></h1>

              <div className={styles.recentCardTime}>
                <h2>12:30PM</h2>
                <p>3 Hours Ago</p>
              </div>

              <div className={styles.line}></div>

              <div className={styles.recentDetails}>
                <div className={styles.recentCircle}></div>

                <h3>
                  which requires Emotion packages. Use one of the following
                  commands to Use one of the Use one of the....
                </h3>
              </div>
            </div>

            <div className={styles.recentCard}>
              <h1></h1>

              <div className={styles.recentCardTime}>
                <h2>12:30PM</h2>
                <p>3 Hours Ago</p>
              </div>

              <div className={styles.line}></div>

              <div className={styles.recentDetails}>
                <div className={styles.recentCircle}></div>

                <h3>
                  which requires Emotion packages. Use one of the following
                  commands to Use one of the Use one of the....
                </h3>
              </div>
            </div>

            <div className={styles.recentCard}>
              <h1></h1>

              <div className={styles.recentCardTime}>
                <h2>12:30PM</h2>
                <p>3 Hours Ago</p>
              </div>

              <div className={styles.line}></div>

              <div className={styles.recentDetails}>
                <div className={styles.recentCircle}></div>

                <h3>
                  which requires Emotion packages. Use one of the following
                  commands to Use one of the Use one of the....
                </h3>
              </div>
            </div>

            <div className={styles.recentCard}>
              <h1></h1>

              <div className={styles.recentCardTime}>
                <h2>12:30PM</h2>
                <p>3 Hours Ago</p>
              </div>

              <div className={styles.line}></div>

              <div className={styles.recentDetails}>
                <div className={styles.recentCircle}></div>

                <h3>
                  which requires Emotion packages. Use one of the following
                </h3>
              </div>
            </div>

            <div className={styles.viewAll}>
              <h1>See more</h1>
              <ExpandMoreIcon />
            </div>
          </div>

          

          <div className={styles.pagesContainer}>
            <div className={styles.pagesContainerHeader}>
              <h1>Frequently Accessed Pages</h1>
            </div>

            <div className={styles.pagesCardContainer}>
              <div className={styles.pagesCard}>
                <div className={styles.pagesCircle}>
                  <h1>AP</h1>
                </div>

                <div className={styles.pagesCardName}>
                  <h1>Administrator Portal...</h1>
                </div>

                <div className={styles.pagesCardTime}>
                  <h1>12:45PM</h1>
                </div>
              </div>

              <div className={styles.pagesCard}>
                <div className={styles.pagesCircle}>
                  <h1>TP</h1>
                </div>

                <div className={styles.pagesCardName}>
                  <h1>Teacher&apos;s Portal...</h1>
                </div>

                <div className={styles.pagesCardTime}>
                  <h1>12:45PM</h1>
                </div>
              </div>

              <div className={styles.pagesCard}>
                <div className={styles.pagesCircle}>
                  <h1>PT</h1>
                </div>

                <div className={styles.pagesCardName}>
                  <h1>Parent&apos;s Portal...</h1>
                </div>

                <div className={styles.pagesCardTime}>
                  <h1>12:45PM</h1>
                </div>
              </div>

              <div className={styles.pagesCard}>
                <div className={styles.pagesCircle}>
                  <h1>AP</h1>
                </div>

                <div className={styles.pagesCardName}>
                  <h1>Accountant Portal...</h1>
                </div>

                <div className={styles.pagesCardTime}>
                  <h1>12:45PM</h1>
                </div>
              </div>

              <div className={styles.pagesCard}>
                <div className={styles.pagesCircle}>
                  <h1>PP</h1>
                </div>

                <div className={styles.pagesCardName}>
                  <h1>Parent Portal...</h1>
                </div>

                <div className={styles.pagesCardTime}>
                  <h1>12:45PM</h1>
                </div>
              </div>

              <div className={styles.pagesCard}>
                <div className={styles.pagesCircle}>
                  <h1>AP</h1>
                </div>

                <div className={styles.pagesCardName}>
                  <h1>Administrator Portal...</h1>
                </div>

                <div className={styles.pagesCardTime}>
                  <h1>12:45PM</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
