import React from "react";
import styles from "../../../styles/accountant_portal/sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { auth} from "../../../lib/firebase";

function Sidebar() {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      router.push("/");
    } catch (error) {
      console.log("Error occur in signing out");
    }
  };

  return (
    <div>
      <div className={styles.sidebarContainer}>
        <div className={styles.schoolNameContainer}>
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="juabenaps_logo"
            className={styles.schoolNameImage}
          />
        </div>

        <div className={styles.sideBarNavLinksContainer}>
          <div className={styles.sideBarLinks}>
            <DashboardIcon />
            <Link href="/account_portal/" className={styles.theLinks}>
              DASHBOARD
            </Link>
          </div>

          <div className={styles.sideBarLinks}>
            <EventIcon />
            <Link
              href=""
              className={styles.theLinks}
            >
              Accountant Notification
            </Link>
          </div>

          <div className={styles.sideBarLinks}>
            <DirectionsBusIcon />
            <Link
              href=""
              className={styles.theLinks}
            >
              Parents Notification
            </Link>
          </div>

          <div className={styles.sideBarLinks} onClick={handleLogOut}>
            <PowerSettingsNewIcon />
            <Link href="" className={styles.theLinks}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
