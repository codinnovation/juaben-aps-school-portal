import React, { useEffect, useState } from "react";
import styles from "../../../styles/admin_portal_css/mainbody.module.css";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AccessTime from "@mui/icons-material/AccessTime";
import Link from "next/link";
import { db } from "../../../lib/firebase";
import { ref, get } from "firebase/database";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import withSession from "@/lib/session";

function MainBody({ user }) {
  const [date, setDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(null);
  const [studentData, setStudentData] = useState([]);

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
          <div className={styles.box}>
            <div className={styles.boxIcon}>
              <AccessTime />
            </div>
            <div className={styles.boxDes}>
              {" "}
              {`${
                currentTime
                  ? currentTime.toLocaleTimeString([], { hour12: true })
                  : "Loading Time..."
              } - ${formattedDate}`}{" "}
            </div>
          </div>

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

          <Link
            href="/administrator-portal/notifications/notificationParents"
            style={{ color: "white", textDecoration: "none" }}
          >
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <NotificationsActiveIcon />
              </div>
              <div className={styles.boxDes}>Notification for Parents</div>
            </div>
          </Link>

          <Link
            href="/administrator-portal/notifications/notificationTeacher"
            style={{ color: "white", textDecoration: "none" }}
          >
            <div className={styles.box}>
              <div className={styles.boxIcon}>
                <NotificationsActiveIcon />
              </div>
              <div className={styles.boxDes}>Notification for Teachers</div>
            </div>
          </Link>

          <Link
            href="/administrator-portal/create-event/"
            style={{ color: "white", textDecoration: "none" }}
          >
            <div className={styles.box}>
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

        <div className={styles.last_container}>
          <div className={styles.last_container_header}>
            <h1>Administrator Activities</h1>
          </div>

          <div className={styles.last_container_items}>
            <div></div>
          </div>
        </div>
      </div>
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
