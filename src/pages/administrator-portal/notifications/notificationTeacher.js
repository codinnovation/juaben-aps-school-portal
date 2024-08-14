import React, { useState } from "react";
import { db } from "../../../lib/firebase";
import { push, ref } from "firebase/database";
import styles from "../../../styles/admin_portal_css/addNotification.module.css";
import Layout from "../layout";
import { useRouter } from "next/router";

function NotificationTeacher() {

  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModal, setSuccessModal] = useState("");
  const [formData, setFormData] = useState({
    TitleNotification: "",
    DateNotification: "",
    MessageNotification: "",
  });

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();

    try {
      const newNotification = push(ref(db, "TeacherssNotification"), formData);
      setSuccessModal("Notification Added Successfully");
      router.push("/administrator-portal/teacherNotification");
      console.log("success");
      setShowSuccessModal(true);

      const newNotificationkey = newNotification.key;
      return newNotificationkey;
    } catch (error) {
      console.log("Error adding notification to Teachers");
    }
    setShowSuccessModal(true);
  };

  const hanldeInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Notification for Teachers</h1>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.inputField}>
              <form onSubmit={handleNotificationSubmit}>
                <input
                  placeholder="Title"
                  type="text"
                  name="TitleNotification"
                  value={formData.TitleNotification}
                  onChange={hanldeInputChange}
                />
                <input
                  placeholder="date"
                  type="date"
                  name="DateNotification"
                  value={formData.DateNotification}
                  onChange={hanldeInputChange}
                />
                <input
                  placeholder="message"
                  type="text"
                  name="MessageNotification"
                  value={formData.MessageNotification}
                  onChange={hanldeInputChange}
                />

                <div className={styles.submitButton}>
                  <button type="submit">submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default NotificationTeacher;
