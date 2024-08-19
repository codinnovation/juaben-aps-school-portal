import React, { useState } from "react";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/router";
import styles from "../../../styles/admin_portal_css/firstHeading.module.css";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import withSession from "@/lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FirstHeading({ user }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {isButtonClicked && (
        <>
          <div className={styles.circle_container}>
            <div className={styles.circle}></div>
            <span>Logging out...</span>
          </div>
        </>
      )}
      <div className={styles.container}>
        <div className={styles.containerItems}>
          <div className={styles.leftContainer}>
            <p>NANA AKOSUA AKYAMAA || ADVENTIST PREPARATORY SCHOOL</p>
          </div>

          <div className={styles.rightContainer}>
            <Person2Icon className={styles.icon1} onClick={handleOpenModal} />
            <LogoutIcon className={styles.icon2} onClick={handleLogout} />
          </div>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle
          style={{ fontSize: "15px", textTransform: "uppercase" }}
        >{`${user?.user?.displayName || ""} Profile`}</DialogTitle>
        <DialogContent>
          <ul
            style={{
              textDecoration: "none",
              listStyle: "none",
              fontFamily: "sans-serif",
            }}
          >
            <li style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
              Email - {user?.email}
            </li>
            <li style={{ fontSize: "12px" }}>Role - {user?.displayName}</li>
            <li style={{ fontSize: "12px" }}>
              Created - {user?.user?.metadata?.creationTime}
            </li>
            <li style={{ fontSize: "12px" }}>
              Last Login - {user?.user?.metadata?.lastSignInTime}
            </li>
          </ul>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
}

export default FirstHeading;

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
