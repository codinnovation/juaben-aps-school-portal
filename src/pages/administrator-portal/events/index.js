import React, { useEffect, useState } from "react";
import styles from "../../../styles/admin_portal_css/event_avai.module.css";
import Layout from "../layout";
import { useRouter } from "next/router";
import { db } from "../../../lib/firebase";
import { get, ref } from "firebase/database";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Index() {
  const [eventsContainer, setEventsContainer] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  function navigateToCreateEvent() {
    router.push({
      pathname: "/administrator-portal/create-event",
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "createEvents");
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          setEventsContainer(dataArray);
        } else {
          setEventsContainer([]);
        }
      } catch (error) {
        console.error("Error fetching data:");
        setEventsContainer([]);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (note) => {
    setSelectedNote(note);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div className={styles.containerItems}>
            <div className={styles.containerHeader}>
              <h1>View Event</h1>
              <h1 onClick={navigateToCreateEvent}>Create Event</h1>
            </div>
          </div>

          <div className={styles.containerBody}>
            {eventsContainer.map((event, index) => (
              <div
                className={styles.bodyItem}
                key={index}
                onClick={() => handleOpen(event)}
              >
                <div className={styles.eventTitle}>
                  <label>Title</label>
                  <h1>{event?.EventName}</h1>
                </div>

                <div className={styles.eventDate}>
                  <label>Date</label>
                  <h1>{`Starts on ${event?.StartDate} to ${event?.EndDate}`}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              height: "80%",
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              overflow: "auto",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <Typography component="h2" sx={{ marginBottom: 2 }}>
              {selectedNote?.EventName}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ whiteSpace: "pre-line" }}
            >
              {selectedNote?.EventDescription}
            </Typography>
            <Button onClick={handleClose} sx={{ marginTop: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>
      </Layout>
    </>
  );
}

export default Index;
