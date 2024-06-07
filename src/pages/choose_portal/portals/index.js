import React from "react";
import styles from "../../../styles/choose-portal/portals.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import CommuteIcon from "@mui/icons-material/Commute";
import AddIcon from "@mui/icons-material/Add";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import Link from "next/link";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export default function Index() {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_items}>
          <div className={styles.container_1}>
            <div className={styles.arrow_forward_container}>
              <ArrowBackIosIcon />
            </div>

            <div className={styles.portals_boxes}>
              <div className={styles.portal}>
                <div className={styles.portal_icon_container}>
                  <SupervisorAccountIcon className={styles.portal_icon} />
                </div>

                <div className={styles.portal_name}>
                  <Link
                    href="/admin_portal"
                    passHref
                    className={styles.link}
                  >
                    <h1>Administrator Portal</h1>
                  </Link>
                </div>
              </div>

              <div className={styles.portal}>
                <div className={styles.portal_icon_container}>
                  <CommuteIcon className={styles.portal_icon} />
                </div>

                <div className={styles.portal_name}>
                  <Link
                  href='/teacher_portal'
                   
                    passHref
                    className={styles.link}
                  >
                    <h1>Teacher&apos;s Portal</h1>
                  </Link>
                </div>
              </div>

              

              <div className={styles.portal}>
                <div className={styles.portal_icon_container}>
                  <TimeToLeaveIcon className={styles.portal_icon} />
                </div>

                <div className={styles.portal_name}>
                  <Link
                  href='/parent_portal'
                   
                    passHref
                    className={styles.link}
                  >
                    <h1>Parent&apos;s Portal</h1>
                  </Link>
                </div>
              </div>

              <div className={styles.portal}>
                <div className={styles.portal_icon_container}>
                  <AddIcon className={styles.portal_icon} />
                </div>

                <div className={styles.portal_name}>
                  <Link
                  href='/account_portal'
                   
                    passHref
                    className={styles.link}
                  >
                    <h1>Accountant Portal</h1>
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.arrow_back_container}>
              <ArrowBackIosNewIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
