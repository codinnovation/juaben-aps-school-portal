import React from "react";
import styles from "../../../styles/choose-portal/portals.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import Person2Icon from "@mui/icons-material/Person2";
import PeopleIcon from "@mui/icons-material/People";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import CommuteIcon from "@mui/icons-material/Commute";
import AddIcon from "@mui/icons-material/Add";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import Link from "next/link";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export default function Index() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.itemContainer}>
          <div className={styles.portalWrapper}>
            <div className={styles.arrowContainer}>
              <ArrowBackIosIcon />
            </div>

            <div className={styles.portalGrid}>
              <div className={styles.portalCard}>
                <div className={styles.portalIconWrapper}>
                  <Person2Icon className={styles.portalIcon} />
                </div>

                <div className={styles.portalName}>
                  <Link
                    href="/admin_portal"
                    passHref
                    className={styles.portalLink}
                  >
                    <h1>Administrator Portal</h1>
                  </Link>
                </div>
              </div>

              <div className={styles.portalCard}>
                <div className={styles.portalIconWrapper}>
                  <PeopleIcon className={styles.portalIcon} />
                </div>

                <div className={styles.portalName}>
                  <Link
                    href="/teacher_portal"
                    passHref
                    className={styles.portalLink}
                  >
                    <h1>Teacher&apos;s Portal</h1>
                  </Link>
                </div>
              </div>

              <div className={styles.portalCard}>
                <div className={styles.portalIconWrapper}>
                  <ConnectWithoutContactIcon className={styles.portalIcon} />
                </div>

                <div className={styles.portalName}>
                  <Link
                    href="/parent_portal"
                    passHref
                    className={styles.portalLink}
                  >
                    <h1>Parent&apos;s Portal</h1>
                  </Link>
                </div>
              </div>

              <div className={styles.portalCard}>
                <div className={styles.portalIconWrapper}>
                  <AddIcon className={styles.portalIcon} />
                </div>

                <div className={styles.portalName}>
                  <Link
                    href="/account_portal"
                    passHref
                    className={styles.portalLink}
                  >
                    <h1>Accountant Portal</h1>
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.arrowContainer}>
              <ArrowBackIosNewIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
