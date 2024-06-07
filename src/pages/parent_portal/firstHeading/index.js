import React, { useState } from "react";
import styles from "../../../styles/parent_portal_css/firstHeader.module.css";
import Menu from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import Person2 from "@mui/icons-material/Person2";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import withSession from "@/lib/session";

function FirstHeader({ children, user }) {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerItems}>
          <div className={styles.containerHeader}>
            <div className={styles.item1}>
              <h1>Parent&apos;s Portal</h1>
            </div>

            <div className={styles.userContainer}>
              <Person2
                className={styles.icon}
                onClick={() => setOpenModal(true)}
              />
              <Logout className={styles.icon} />
            </div>

            <div
              className={styles.menuContainer}
              onClick={() => setOpenModal(true)}
            >
              <Menu />
            </div>
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
              Last Login - {user?.metadata?.lastSignInTime}
            </li>

            <li style={{ fontSize: "15px" }}>Notifications</li>

            <li style={{ fontSize: "15px" }}>Logout</li>
          </ul>
        </DialogContent>
      </Dialog>

      {children}
    </>
  );
}

export default FirstHeader;


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
