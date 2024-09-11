import React, { useEffect, useState } from "react";
import styles from "../../../styles/admin_portal_css/mainbody.module.css";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Link from "next/link";
import { db } from "../../../lib/firebase";
import { ref, get } from "firebase/database";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import withSession from "@/lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainBody({ user }) {
  const [date, setDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [openCreateParentNotification, setOpenCreateParentNotification] =
    useState(false);
  const [openCreateTeacerNotification, setOpenCreateTeacerNotification] =
    useState(false);
  const [eventData, setEventData] = useState({
    EventName: "",
    EventVenue: "",
    StartDate: "",
    EndDate: "",
    EventDescription: "",
  });

  const [notificationData, setNotificationData] = useState({
    TitleNotification: "",
    DateNotification: "",
    MessageNotification: "",
  });

  const [teacherNotification, setTeacherNotification] = useState({
    TitleNotification: "",
    DateNotification: "",
    MessageNotification: "",
  });

  const handleTeacherNotificationSubmit = async (e) => {
    e.preventDefault();

    try {
      const newNotification = push(
        ref(db, "TeacherssNotification"),
        teacherNotification
      );
      setSuccessModal("Notification Added Successfully");
      router.push("/administrator-portal/teacherNotification");
      const newNotificationkey = newNotification.key;
      return newNotificationkey;
    } catch (error) {
      console.log("Error adding notification to Teachers");
    }
    setShowSuccessModal(true);
  };

  const hanldeInputTeacherChange = (e) => {
    const { name, value } = e.target;
    setTeacherNotification({
      ...teacherNotification,
      [name]: value,
    });
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();

    try {
      const newNotification = push(
        ref(db, "parentsNotification"),
        notificationData
      );
      toast.success("Sent Successfully");
      setOpenCreateParentNotification(false);

      const newNotificationkey = newNotification.key;
      return newNotificationkey;
    } catch (error) {
      toast.error("Error Sending Notification to Parents");
    }
  };

  const hanldeInputChange = (e) => {
    const { name, value } = e.target;
    setNotificationData({
      ...notificationData,
      [name]: value,
    });
  };

  const handleCreateEvent = async (e) => {
    try {
      const newEvent = push(ref(db, "createEvents"), eventData);
      toast.success("Event Created successful");
      const newEventKey = newEvent.newEventKey;
      setOpenCreateEvent(false);
      toast.success("Event Created successful");
      return newEventKey;
    } catch (error) {
      toast.error("Error creating event");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "japsstudents");
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          setStudentData(dataArray);
        } else {
          setStudentData([]);
        }
      } catch (error) {
        console.error("Error fetching data:");
        setStudentData([]);
      }
    };

    fetchData();

    const fetchInterval = setInterval(fetchData, 1000);
    return () => clearInterval(fetchInterval);
  }, []);

  const getGenderPercentage = () => {
    const totalStudents = studentData.length;
    const maleStudents = studentData.filter(
      (student) => student.Gender === "Male"
    ).length;
    const femaleStudents = studentData.filter(
      (student) => student.Gender === "Female"
    ).length;

    const malePercentage = (maleStudents / totalStudents) * 100;
    const femalePercentage = (femaleStudents / totalStudents) * 100;

    return { malePercentage, femalePercentage };
  };

  const { malePercentage, femalePercentage } = getGenderPercentage();

  const getBackgroundColor = (percentage) => {
    if (percentage >= 75) {
      return "green";
    } else if (percentage >= 50) {
      return "lightgreen";
    } else {
      return "orange";
    }
  };

  return (
    <>
      <div className={styles.mainbodyContainer}>
        <div className={styles.mainbodyBoxes}>
          <Link
            href="/administrator-portal/set-student-fees/"
            style={{ textDecoration: "none" }}
          >
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <AttachMoneyIcon />
              </div>
              <div className={styles.boxDes}>Student fees</div>
            </div>
          </Link>

          <Link
            href="/administrator-portal/register-non-staff/"
            style={{ textDecoration: "none" }}
          >
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <EngineeringIcon />
              </div>
              <div className={styles.boxDes}>Admit Non Teaching Staff</div>
            </div>
          </Link>

          <Link
            href="/administrator-portal/register-teacher/"
            style={{ textDecoration: "none" }}
          >
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <LocalLibraryIcon />
              </div>
              <div className={styles.boxDes}>Admit Teacher</div>
            </div>
          </Link>

          <Link href="" style={{ color: "white", textDecoration: "none" }}>
            <div
              className={styles.box}
              onClick={() => setOpenCreateParentNotification(true)}
            >
              <div className={styles.boxIcon}>
                <NotificationsActiveIcon />
              </div>
              <div className={styles.boxDes}>Create Notification - Parents</div>
            </div>
          </Link>

          <Link
            href=""
            onClick={() => setOpenCreateTeacerNotification(true)}
            style={{ color: "white", textDecoration: "none" }}
          >
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <NotificationsActiveIcon />
              </div>
              <div className={styles.boxDes}>
                Create Notification - Teachers
              </div>
            </div>
          </Link>

          <Link style={{ color: "white", textDecoration: "none" }} href="">
            <div
              className={styles.box}
              onClick={() => setOpenCreateEvent(true)}
            >
              <div className={styles.boxIcon}>
                <EventAvailableIcon />
              </div>
              <div className={styles.boxDes}>Create Event</div>
            </div>
          </Link>
        </div>

        <div className={styles.studentPercentage}>
          <div
            className={styles.malePercentage}
            style={{
              backgroundColor: getBackgroundColor(malePercentage),
            }}
          >
            <h1>{`${malePercentage.toFixed(2)}% male student`}</h1>
          </div>
          <div
            className={styles.femalePercentage}
            style={{
              backgroundColor: getBackgroundColor(femalePercentage),
            }}
          >
            <h1>{`${femalePercentage.toFixed(2)}% female student`}</h1>
          </div>
        </div>
      </div>

      {openCreateEvent && (
        <>
          <div className={styles.createEventContainer}>
            <div className={styles.createEventContent}>
              <h1 onClick={() => setOpenCreateEvent(false)}>Hide</h1>

              <div className={styles.inputFormContainer}>
                <form onSubmit={handleCreateEvent}>
                  <div className={styles.inputFieldGrid}>
                    <div className={styles.field}>
                      <label>Event Name</label>
                      <input
                        placeholder="Event Name"
                        name="Event Name"
                        value={eventData.EventName}
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            EventName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className={styles.field}>
                      <label>Event Venue</label>
                      <input
                        placeholder="Event Venue"
                        name="Event Venue"
                        value={eventData.EventVenue}
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            EventVenue: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className={styles.field}>
                      <input
                        placeholder="Event Start Date"
                        name="Start Date"
                        value={eventData.StartDate}
                        type="date"
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            StartDate: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className={styles.field}>
                      <label>End Date</label>
                      <input
                        placeholder="Event End Date"
                        name="End Date"
                        value={eventData.EndDate}
                        type="date"
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            EndDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.inputFieldNoGrid}>
                    <label> Description</label>
                    <textarea
                      value={eventData.EventDescription}
                      name="Event Description"
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          EventDescription: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className={styles.submitButton}>
                    <button type="submit">Create</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {openCreateParentNotification && (
        <>
          <div className={styles.createEventContainer}>
            <div className={styles.createEventContent}>
              <h1 onClick={() => setOpenCreateParentNotification(false)}>
                Hide
              </h1>

              <div className={styles.inputFormContainer}>
                <form onSubmit={handleNotificationSubmit}>
                  <div className={styles.inputFieldGrid}>
                    <div className={styles.field}>
                      <label>Title</label>
                      <input
                        placeholder="Title"
                        type="text"
                        name="TitleNotification"
                        value={notificationData.TitleNotification}
                        onChange={hanldeInputChange}
                      />
                    </div>

                    <div className={styles.field}>
                      <label> Date</label>
                      <input
                        placeholder="date"
                        type="date"
                        name="DateNotification"
                        value={notificationData.DateNotification}
                        onChange={hanldeInputChange}
                      />
                    </div>

                    <div className={styles.inputFieldNoGrid}>
                      <label> Message</label>
                      <textarea
                        placeholder="message"
                        type="text"
                        name="MessageNotification"
                        value={notificationData.MessageNotification}
                        onChange={hanldeInputChange}
                      />
                    </div>
                  </div>

                  <div className={styles.submitButton}>
                    <button type="submit">Create</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {openCreateTeacerNotification && (
        <>
          <div className={styles.createEventContainer}>
            <div className={styles.createEventContent}>
              <h1 onClick={() => setOpenCreateTeacerNotification(false)}>
                Hide
              </h1>

              <div className={styles.inputFormContainer}>
                <form onSubmit={handleTeacherNotificationSubmit}>
                  <div className={styles.inputFieldGrid}>
                    <div className={styles.field}>
                      <label>Title</label>
                      <input
                        placeholder="Title"
                        type="text"
                        name="TitleNotification"
                        value={teacherNotification.TitleNotification}
                        onChange={hanldeInputTeacherChange}
                      />
                    </div>

                    <div className={styles.field}>
                      <label> Date</label>
                      <input
                        placeholder="date"
                        type="date"
                        name="DateNotification"
                        value={teacherNotification.DateNotification}
                        onChange={hanldeInputTeacherChange}
                      />
                    </div>

                    <div className={styles.inputFieldNoGrid}>
                      <label> Message</label>
                      <textarea
                        placeholder="message"
                        type="text"
                        name="MessageNotification"
                        value={teacherNotification.MessageNotification}
                        onChange={hanldeInputTeacherChange}
                      />
                    </div>
                  </div>

                  <div className={styles.submitButton}>
                    <button type="submit">Create</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
}
export default MainBody;

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
      user: user,
    },
  };
});
