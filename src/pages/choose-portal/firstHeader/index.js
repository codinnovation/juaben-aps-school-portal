import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/choose-portal/firstHeader.module.css";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withSession from "@/lib/session";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SchoolLogo from "../../../../public/logo2.png";

function Index({ user }) {
  const [openModal, setOpenModal] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  console.log(user);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const router = useRouter();

  const createTeacherAccount = () => {
    setIsButtonClicked(true);
    router.push("/create-teacher");
  };

  const createParentAccount = () => {
    setIsButtonClicked(true);
    router.push("/create-parent");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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

  return (
    <>
      {isButtonClicked && (
        <>
          <div className={styles.loadingContainer}>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        </>
      )}
      <div className={styles.firstContainer}>
        <div className={styles.firstContent}>
          <div className={styles.schoolLogo}>
            <Image src={SchoolLogo} alt="thp_logo" className={styles.logo} />
          </div>
          <div className={styles.searchInput}>
            <input placeholder="search..." />
            <SearchIcon className={styles.SearchIcon} />
          </div>
          <div
            className={styles.notificationContainer}
            onClick={() => setOpenNotification(true)}
          >
            <h1>3</h1>
            <NotificationsIcon className={styles.NotificationsIcon} />
          </div>

          <div className={styles.welcomeContainer}>
            <h1>Welcome,</h1>
            <h1>{`${user?.displayName}`}</h1>
          </div>

          <div className={styles.userProfile} onClick={handleOpenModal}>
            <AccountCircleIcon className={styles.userIcon} />
            <KeyboardArrowDownIcon className={styles.KeyboardArrowDownIcon} />
          </div>

         
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <Button>Profile</Button>
          {user.displayName === "Administrator" && (
            <Button onClick={createTeacherAccount}>
              Create Account For Teacher
            </Button>
          )}

          {user.displayName === "Administrator" && (
            <Button onClick={createParentAccount}>
              Create Account For Parent
            </Button>
          )}

          <Button onClick={handleLogout}>Logout</Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openNotification}
        onClose={() => setOpenNotification(false)}
      >
        <DialogContent>
          <li>This is an example of notifications</li>
          <li>This is an example of notifications</li>
          <li>This is an example of notifications</li>
          <li>This is an example of notifications</li>
          <li>This is an example of notifications</li>
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
