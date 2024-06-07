import React, { useState } from "react";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/router";
import styles from "../../../styles/accountant_portal/firstheading.module.css";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import withSession from "@/lib/session";

function FirstHeading({user}) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:");
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
      <div className={styles.container}>
        <div className={styles.containerItems}>
          <div className={styles.leftContainer}>
            <p>
              NANA AKOSUA AKYAMAA || ADVENTIST PREPARATORY SCHOOL -
              {user?.displayName}
            </p>
          </div>

          <div className={styles.rightContainer}>
            <Person2Icon className={styles.icon1} onClick={handleOpenModal} />
            <LogoutIcon className={styles.icon2} onClick={handleLogOut} />
          </div>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle
          style={{ fontSize: "15px", textTransform: "uppercase" }}
        >{`${user?.displayName} Profile`}</DialogTitle>
        <DialogContent>
          <ul style={{ textDecoration: "none", listStyle: "none" }}>
            <li style={{ fontSize: "12px" }}>Email - {user?.email}</li>
            <li style={{ fontSize: "12px" }}>Role - {user?.displayName}</li>
            <li style={{ fontSize: "12px" }}>
              Created - {user?.metadata?.creationTime}
            </li>
            <li style={{ fontSize: "12px" }}>
              Last Login - {user?.metadata?.lastSignInTime}
            </li>
          </ul>
        </DialogContent>
      </Dialog>
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
