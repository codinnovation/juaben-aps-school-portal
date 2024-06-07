import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/choose-portal/firstHeader.module.css";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import Person2 from "@mui/icons-material/Person2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "@mui/icons-material/Menu";
import withSession from "@/lib/session";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function Index({ user }) {
  const [openModal, setOpenModal] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [progress, setProgress] = useState(0);



  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const router = useRouter();

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
          <div className={styles.circle_container}>
            <Box sx={{ width: "70%" }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          </div>
        </>
      )}
      <div className={styles.container}>
        <div className={styles.container_items}>
          <div className={styles.container_1}>
            <Image
              src="/logo2.png"
              width={100}
              height={100}
              alt="thp_logo"
              className={styles.container_1_image}
            />
          </div>
          <div className={styles.container_2}>
            <input placeholder="search..." />
            <SearchIcon className={styles.SearchIcon} />
          </div>
          <div
            className={styles.container_3}
            onClick={() => setOpenNotification(true)}
          >
            <h1>3</h1>
            <NotificationsIcon className={styles.NotificationsIcon} />
          </div>

          <div className={styles.container_4}>
            <h1>Welcome,</h1>
            <h1>{`${user?.displayName}`}</h1>
          </div>

          <div className={styles.container_5} onClick={handleOpenModal}>
            <AccountCircleIcon className={styles.container_image} />
            <KeyboardArrowDownIcon className={styles.KeyboardArrowDownIcon} />
          </div>

          <div className={styles.container_6} onClick={handleLogout}>
            <Logout />
          </div>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <Button>Profile</Button>
          <Button>Settings</Button>
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
