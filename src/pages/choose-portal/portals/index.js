import React from "react";
import styles from "../../../styles/choose-portal/portals.module.css";
import Person2Icon from "@mui/icons-material/Person2";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Link from "next/link";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import MoneyIcon from '@mui/icons-material/Money';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SchoolIcon from '@mui/icons-material/School';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import withSession from "@/lib/session";

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

          <div className={styles.clickContainer}>
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

          <div className={styles.clickContainer}>
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

          <div className={styles.clickContainer}>
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

          <div className={styles.clickContainer}>
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
