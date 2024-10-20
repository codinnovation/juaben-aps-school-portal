import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/choose-portal/firstHeader.module.css";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Dialog, DialogContent, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withSession from "@/lib/session";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SchoolLogo from "../../../../public/logo2.png";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

function Index({ user }) {
  const router = useRouter();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfileModal, setOpenProfileModal] = useState(false)

  const handleLogout = async (e) => {
    setIsButtonClicked(true);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Logout Successful");
        router.push("/login");
        setIsButtonClicked(false);
      } else {
        toast.error("Logout Failed");
        setIsButtonClicked(false);
      }
    } catch (error) {
      toast.error("Error Occurred");
      setIsButtonClicked(false);
    }
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open); // Toggle modal visibility
  };

  const handleOpenProfileModal = (e) => {
    setAnchorEl(e.currentTarget)
    setOpenProfileModal(!openProfileModal)
  }

  return (
    <>
      {isButtonClicked && (
        <div className={styles.loadingContainer}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}

      <div className={styles.firstHeaderContainer}>
        <div className={styles.firstHeaderContent}>
          <div className={styles.logoContainer}>
            <Image src={SchoolLogo} width={900} height={900} alt="" />
          </div>

          <div className={styles.searchContainer}>
            <input placeholder="Search..." />
          </div>

          <div className={styles.profileContainer}>
            <div className={styles.notificationContainer} onClick={handleNotificationClick}>
              <NotificationsIcon className={styles.icon} />
              <h1>2</h1>
            </div>

            <div className={styles.profilePhoto} onClick={handleOpenProfileModal}>
              <PersonIcon className={styles.icon} />
            </div>

            <div className={styles.logoutContainer} onClick={handleLogout}>
              <LogoutIcon className={styles.icon} />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorEl}
        PaperProps={{
          style: {
            position: 'absolute',
            top: anchorEl ? anchorEl.getBoundingClientRect().bottom : '50px',
            left: anchorEl ? anchorEl.getBoundingClientRect().left : '0px',
            margin: '0',
          },
        }}
      >
        <DialogContent>
          <h3>Notifications</h3>
          <p>You have 2 new notifications.</p>
          <p>You have 2 new notifications.</p>
          <p>You have 2 new notifications.</p>
        </DialogContent>
      </Dialog>


      {/* Profile Modal */}
      <Dialog
        open={openProfileModal}
        onClose={() => setOpenProfileModal(false)}
        anchorEl={anchorEl}
        PaperProps={{
          style: {
            position: 'absolute',
            top: anchorEl ? anchorEl.getBoundingClientRect().bottom : '50px',
            left: anchorEl ? anchorEl.getBoundingClientRect().left : '50px',
            margin: '0',
          },
        }}
      >
        <DialogContent className={styles.buttonContainer}>
          <button onClick={() => router.push("/create-teacher")}>Create Teacher&apos;s Account</button>
          <button onClick={() => router.push('/create-parent')}>Create Parents&apos;s Account</button>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
}

export default Index;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

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
