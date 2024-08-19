import React, { useEffect, useState } from "react";
import styles from "../../../styles/accountant_portal/mainbody.module.css";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AccessTime from "@mui/icons-material/AccessTime";
import Link from "next/link";

function Index() {
  const [date, setDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(null);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className={styles.mainbodyContainer}>
        <div className={styles.mainbodyBoxes}>
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <AccessTime />
            </div>
            <div className={styles.boxDes}>
              {" "}
              {`${
                currentTime
                  ? currentTime.toLocaleTimeString([], { hour12: true })
                  : "Loading Time..."
              } - ${formattedDate}`}{" "}
            </div>
          </div>


          <Link
            href="/accountant-portal/student-list/"
            style={{ textDecoration: "none" }}
          >
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <EngineeringIcon />
              </div>
              <div className={styles.boxDes}>Student List</div>
            </div>
          </Link>

          <Link
            href="/"
            style={{ textDecoration: "none" }}
          >
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <LocalLibraryIcon />
              </div>
              <div className={styles.boxDes}>Help</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Index;
