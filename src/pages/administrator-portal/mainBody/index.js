import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/admin_portal_css/mainbody.module.css";
import { db } from "../../../lib/firebase";
import { ref, get } from "firebase/database";
import withSession from "@/lib/session";
import { ToastContainer, toast } from "react-toastify";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "react-toastify/dist/ReactToastify.css";
import PeopleIcon from "@mui/icons-material/People";



function MainBody({ user }) {
  const router = useRouter();
  const [studentData, setStudentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [date, setDate] = useState(new Date());



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
        setStudentData([]);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, "usersTeachers");
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          setTeacherData(dataArray);
        } else {
          setTeacherData([]);
        }
      } catch (error) {
        setTeacherData([]);
      }
    };

    fetchData();
  }, []);

  const getGenderPercentage = () => {
    const totalStudents = studentData.length;
    const maleStudents = studentData.filter(
      (student) => student.Gender === "Male"
    ).length;
    const femaleStudents = studentData.filter(
      (student) => student.Gender === "Female"
    ).length;

    const malePercentage = Math.round((maleStudents / totalStudents) * 100);
    const femalePercentage = Math.round((femaleStudents / totalStudents) * 100);

    return { malePercentage, femalePercentage };
  };

  const { malePercentage, femalePercentage } = getGenderPercentage();


  const data = [
    { name: "Female", uv: femalePercentage },
    { name: "Male", uv: malePercentage }
  ]

  const getGenderCounts = () => {
    const totalStudents = studentData.length;
    const maleStudents = studentData.filter(
      (student) => student.Gender === "Male"
    ).length;
    const femaleStudents = studentData.filter(
      (student) => student.Gender === "Female"
    ).length;

    return { maleStudents, femaleStudents, totalStudents };
  };

  const { maleStudents, femaleStudents } = getGenderCounts();



  return (
    <>
      <div className={styles.mainbodyContainer}>
        <div className={styles.mainbodyContent}>

          <div className={styles.boxesContainer}>
            <div className={styles.box}>
              <div className={styles.boxHeader}>
                <PeopleIcon className={styles.icon} />
                <div className={styles.descriptions}>
                  <p>{studentData?.length}</p>
                  <h1>Total Students</h1>
                </div>
              </div>

              <div className={styles.lineContainer}></div>

              <div className={styles.activePeople}>
                <p>Active Students</p>
                <h1>{studentData?.length}</h1>
              </div>

            </div>


            <div className={styles.box}>
              <div className={styles.boxHeader}>
                <PeopleIcon className={styles.icon} />
                <div className={styles.descriptions}>
                  <p>{femalePercentage}%</p>
                  <h1>Female Students</h1>
                </div>
              </div>

              <div className={styles.lineContainer}></div>

              <div className={styles.activePeople}>
                <p>Total Female</p>
                <h1>{femaleStudents}</h1>
              </div>


            </div>

            <div className={styles.box}>
              <div className={styles.boxHeader}>
                <PeopleIcon className={styles.icon} />
                <div className={styles.descriptions}>
                  <p>{malePercentage}%</p>
                  <h1>Male Students</h1>
                </div>
              </div>

              <div className={styles.lineContainer}></div>

              <div className={styles.activePeople}>
                <p>Total Male</p>
                <h1>{maleStudents}</h1>
              </div>

            </div>

            <div className={styles.box}>
              <div className={styles.boxHeader}>
                <PeopleIcon className={styles.icon} />
                <div className={styles.descriptions}>
                  <p>{teacherData?.length}</p>
                  <h1>Total Teachers</h1>
                </div>
              </div>

              <div className={styles.lineContainer}></div>

              <div className={styles.activePeople}>
                <p>Active Teachers</p>
                <h1>{teacherData?.length}</h1>
              </div>
            </div>

            <div className={styles.box}>
              <div className={styles.boxHeader}>
                <PeopleIcon className={styles.icon} />
                <div className={styles.descriptions}>
                  <p>{teacherData?.length}</p>
                  <h1>Total Non-Staff</h1>
                </div>
              </div>

              <div className={styles.lineContainer}></div>

              <div className={styles.activePeople}>
                <p>Active Non-Staff</p>
                <h1>{teacherData?.length}</h1>
              </div>
            </div>

          </div>

          <div className={styles.bottomContainer}>
            <div className={styles.box}>
              <Calendar
                onChange={setDate}
                value={date}
                className={styles.calendar}
              />
            </div>
            <div className={styles.box}>
              <div className={styles.boxHeader}>
                <h1>Notifications</h1>
              </div>

              <div className={styles.listContainer}>
                <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor</h1>
                <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor</h1>
                <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor</h1>
                <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor</h1>
                <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor</h1>
                <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor</h1>
                <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
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
