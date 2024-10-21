import React, { useState, useEffect } from "react";
import styles from "../../../styles/admin_portal_css/partea.module.css";
import Layout from "../layout";
import { db, auth } from "../../../lib/firebase";
import { ref, get, push, update, remove } from "firebase/database";
import { Toaster, toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import AddAlertIcon from '@mui/icons-material/AddAlert';
import withSession from "@/lib/session";

function Index() {
  const [notificationContainer, setNotificationContainer] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openNotificationForm, setOpenNotificationForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false); // State for edit form
  const [notificationData, setNotificationData] = useState({
    date: "",
    header: "",
    message: "",
  });

  const handleChangeInput = (e) => {
    const { value, name } = e.target;

    setNotificationData({
      ...notificationData,
      [name]: value
    });
  };

  const handleCloseNotificationForm = () => {
    setOpenNotificationForm(false);
    setNotificationData({ date: "", header: "", message: "" }); // Reset data
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
    setNotificationData({ date: "", header: "", message: "" }); // Reset data
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "ParentsNotification");
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
  }, []);

  const handleSubmitNotification = async () => {
    try {
      const newNotification = push(ref(db, "ParentsNotification"), notificationData);
      const newNotificationKey = newNotification.key;
      toast.success(`Notification added successfully`);
      handleCloseNotificationForm();
      window.location.reload();
      return newNotificationKey;
    } catch (error) {
      toast.error("Error occurred in adding Notification");
      console.log("Error: " + error);
      handleCloseNotificationForm();
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
  };

  const handleEditNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setNotificationData(notification); // Set data to the notification being edited
    setOpenEditForm(true);
  };

  const handleDeleteNotification = async (key) => {
    try {
      await remove(ref(db, `ParentsNotification/${key}`));
      toast.success("Notification deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Error occurred in deleting Notification");
      console.log("Error: " + error);
    }
  };

  const handleUpdateNotification = async () => {
    try {
      const notificationRef = ref(db, `ParentsNotification/${selectedNotification.key}`);
      await update(notificationRef, notificationData);
      toast.success("Notification updated successfully");
      handleCloseEditForm();
      window.location.reload();
    } catch (error) {
      toast.error("Error occurred in updating Notification");
      console.log("Error: " + error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const truncateMessage = (message, wordLimit) => {
    const words = message?.split(" ");
    if (words?.length > wordLimit) {
      return words?.slice(0, wordLimit).join(" ") + "...";
    }
    return message;
  };

  return (
    <>
      <Layout>
        <div className={styles.notificationContainer}>
          <div className={styles.notificationContent}>
            <div className={styles.notificationHeader}>
              <div className={styles.title}>
                <h1>Notifications</h1>
              </div>
              <div
                className={styles.addNotification}
                onClick={() => setOpenNotificationForm(true)}
              >
                <AddAlertIcon className={styles.icon} />
                <h1>Add Notification</h1>
              </div>
            </div>

            <div className={styles.notificationBoxContainer}>
              <div className={styles.tableHeader}>
                <h1>Date</h1>
                <h1>Header</h1>
                <h1>Message</h1>
              </div>

              {notificationContainer.map((notification) => (
                <div
                  key={notification.key}
                  className={styles.tableColumn}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <h1>{notification.date || "N/A"}</h1>
                  <h1>{truncateMessage(notification.header, 4)}</h1>
                  <h1>{truncateMessage(notification.message, 10)}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>

        {openNotificationForm && (
          <div className={styles.formContainer}>
            <div className={styles.inputField}>
              <input
                type="date"
                name="date"
                value={notificationData.date}
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Header"
                name="header"
                value={notificationData.header}
                onChange={handleChangeInput}
              />
              <textarea
                placeholder="Your message"
                name="message"
                value={notificationData.message}
                onChange={handleChangeInput}
              />
            </div>
            <div className={styles.actionButton}>
              <button onClick={handleSubmitNotification}>Add</button>
              <button onClick={handleCloseNotificationForm}>Close</button>
            </div>
          </div>
        )}

        {/* Modal for displaying full notification details */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>{selectedNotification?.header}</DialogTitle>
          <DialogContent>{selectedNotification?.message}</DialogContent>
          <Button onClick={() => handleEditNotificationClick(selectedNotification)}>EDIT</Button>
          <Button onClick={() => handleDeleteNotification(selectedNotification.key)}>DELETE</Button>
        </Dialog>

        {/* Edit Notification Form */}
        {openEditForm && (
          <div className={styles.formContainer}>
            <div className={styles.inputField}>
              <input
                type="date"
                name="date"
                value={notificationData.date}
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Header"
                name="header"
                value={notificationData.header}
                onChange={handleChangeInput}
              />
              <textarea
                placeholder="Your message"
                name="message"
                value={notificationData.message}
                onChange={handleChangeInput}
              />
            </div>
            <div className={styles.actionButton}>
              <button onClick={handleUpdateNotification}>Update</button>
              <button onClick={handleCloseEditForm}>Close</button>
            </div>
          </div>
        )}
      </Layout>

      <Toaster />
    </>
  );
}

export default Index;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (!user || user?.displayName !== "Administrator") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  auth.signOut();

  if (user) {
    req.session.set("user", user);
    await req.session.save();
  }

  return {
    props: {
      user,
    },
  };
});
