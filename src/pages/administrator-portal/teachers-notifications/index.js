import React, { useState, useEffect } from "react";
import styles from "../../../styles/admin_portal_css/partea.module.css";
import Layout from "../layout";
import { db } from "../../../lib/firebase";
import { ref, get } from "firebase/database";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

function Index() {
  const [notificationContainer, setNotificationContainer] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "TeacherssNotification");
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          setNotificationContainer(dataArray);
        } else {
          setNotificationContainer([]);
        }
      } catch (error) {
        console.error("Error fetching data:");
        setNotificationContainer([]);
      }
    };

    fetchData();

    const fetchInterval = setInterval(fetchData, 3000);
    return () => clearInterval(fetchInterval);
  }, []);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div className={styles.containerItems}>
            <div className={styles.containerHeader}>
              <h1>Notifications For Teacher</h1>
            </div>

            <div className={styles.containerBody}>
              <div className={styles.containerBodyItems}>
                {notificationContainer.map((notification, index) => (
                  <ul
                    key={index}
                    className={styles.notificationItem}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <li>{`${notification.TitleNotification} - ${notification.DateNotification}`}</li>
                  </ul>
                ))}
              </div>
            </div>

            <div className={styles.selectDateContainer}>
              <input type="date" />
            </div>
          </div>
        </div>
      </Layout>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle style={{ fontSize: "15px", textTransform: "uppercase" }}>
          {selectedNotification ? selectedNotification.TitleNotification : ""}
        </DialogTitle>
        <DialogContent>
          <ul style={{ textDecoration: "none", listStyle: "none" }}>
            <li style={{ fontSize: "12px" }}>
              {selectedNotification
                ? selectedNotification.MessageNotification
                : ""}
            </li>
            <li style={{ fontSize: "12px" }}>
              {selectedNotification
                ? selectedNotification.DateNotification
                : ""}
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Index;
