import React from "react";
import styles from "../../../styles/choose-portal/portals.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import Person2Icon from "@mui/icons-material/Person2";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import PaymentsIcon from '@mui/icons-material/Payments';
import Link from "next/link";

export default function Index() {
  const handlePortalClick = (abbreviation, portalName) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newPortal = { abbreviation, portalName, time };

    const storedPortals = JSON.parse(localStorage.getItem("selectedPortals")) || [];
    const updatedPortals = [newPortal, ...storedPortals];

    if (updatedPortals.length > 6) {
      updatedPortals.pop();
    }

    localStorage.setItem("selectedPortals", JSON.stringify(updatedPortals));
  };

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
                    href="/administrator-portal"
                    passHref
                    className={styles.portalLink}
                    onClick={() =>
                      handlePortalClick("AP", "Administrator Portal")
                    }
                  >
                    <h1>Administrator Portal</h1>
                  </Link>
                </div>
              </div>

              <div className={styles.portalCard}>
                <div className={styles.portalIconWrapper}>
                  <Diversity3Icon className={styles.portalIcon} />
                </div>

                <div className={styles.portalName}>
                  <Link
                    href="/teacher-portal"
                    passHref
                    className={styles.portalLink}
                    onClick={() => handlePortalClick("TP", "Teacher's Portal")}
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
                    href="/parent-portal"
                    passHref
                    className={styles.portalLink}
                    onClick={() => handlePortalClick("PP", "Parent's Portal")}
                  >
                    <h1>Parent&apos;s Portal</h1>
                  </Link>
                </div>
              </div>

              <div className={styles.portalCard}>
                <div className={styles.portalIconWrapper}>
                  <PaymentsIcon className={styles.portalIcon} />
                </div>

                <div className={styles.portalName}>
                  <Link
                    href="/accountant-portal"
                    passHref
                    className={styles.portalLink}
                    onClick={() =>
                      handlePortalClick("AP", "Accountant Portal")
                    }
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
