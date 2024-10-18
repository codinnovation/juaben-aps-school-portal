import React from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/choose-portal/portals.module.css";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import MoneyIcon from '@mui/icons-material/Money';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SchoolIcon from '@mui/icons-material/School';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import withSession from "@/lib/session";


export default function Index() {
  const router = useRouter();
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
    <div className={styles.portalContainer}>
      <div className={styles.portalContent}>
        <div className={styles.portalBox}>
          <div className={styles.portalName}>
            <AdminPanelSettingsIcon className={styles.icon} />
            <div className={styles.name}>
              <h1>Administrator&apos;s </h1>
              <h1>Portal</h1>
            </div>
          </div>

          <div className={styles.clickContainer} onClick={() => handlePortalClick("AP", "Administrator Portal", router.push("/administrator-portal"))}>
            <h1>Click Now</h1>
            <ArrowRightIcon className={styles.icon} />
          </div>
        </div>


        <div className={styles.portalBox}>
          <div className={styles.portalName}>
            <SchoolIcon className={styles.icon} />
            <div className={styles.name}>
              <h1>Teacher&apos;s </h1>
              <h1>Portal</h1>
            </div>
          </div>

          <div className={styles.clickContainer} onClick={() => handlePortalClick("TP", "Teacher's Portal", router.push("/teacher-portal"))}>
            <h1>Click Now</h1>
            <ArrowRightIcon className={styles.icon} />
          </div>
        </div>


        <div className={styles.portalBox}>
          <div className={styles.portalName}>
            <MoneyIcon className={styles.icon} />
            <div className={styles.name}>
              <h1>Accountant&apos;s </h1>
              <h1>Portal</h1>
            </div>
          </div>

          <div className={styles.clickContainer} onClick={() => handlePortalClick("AC", "Accountant Portal", router.push("/accountant-portal"))}>
            <h1>Click Now</h1>
            <ArrowRightIcon className={styles.icon} />
          </div>
        </div>

        <div className={styles.portalBox}>
          <div className={styles.portalName}>
            <SupervisorAccountIcon className={styles.icon} />
            <div className={styles.name}>
              <h1>Parent&apos;s </h1>
              <h1>Portal</h1>
            </div>
          </div>

          <div className={styles.clickContainer} onClick={() => handlePortalClick("PP", "Parent Portal", router.push("/parent-portal"))}>
            <h1>Click Now</h1>
            <ArrowRightIcon className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
}

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
