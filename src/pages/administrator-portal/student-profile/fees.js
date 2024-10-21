import React, { useEffect, useState } from "react";
import styles from "../../../styles/admin_portal_css/studentFees.module.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DriverPhoto from '../../../../public/studentprofile.avif'
import { db } from "../../../lib/firebase";
import { ref, get } from "firebase/database";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import withSession from "@/lib/session";


function StudentFees({ selectedStudent, hideStudentProfilePage , activeComponent}) {
  const [paymentHistoryArray, setPaymentHistoryArray] = useState([]);
  const [balanceFee, setBalanceFee] = useState();
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(
          db,
          `/japsstudents/${selectedStudent.key}/SchoolFees/Payments`
        );
        const response = await get(dbRef);
        const data = response.val();

        if (data && typeof data === "object") {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));

          const totalPayment = dataArray.reduce(
            (acc, payment) => acc + (payment.AmountOfPayment || 0),
            0
          );

          setBalanceFee(selectedStudent?.SchoolFees?.TotalFees - totalPayment);

          setPaymentHistoryArray(dataArray);
        } else {
          setPaymentHistoryArray([]);
          setBalanceFee(selectedStudent?.SchoolFees?.TotalFees || 0);
        }
      } catch (error) {
        console.error("Error fetching data:");
        setPaymentHistoryArray([]);
        setBalanceFee(selectedStudent?.SchoolFees?.TotalFees || 0);
      }
    };

    fetchData();
  }, [selectedStudent?.SchoolFees?.TotalFees, selectedStudent.key]);

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.profileHeader}>
            <div className={styles.backButton}>
              <div
                className={styles.button}
                onClick={hideStudentProfilePage}
              >
                <KeyboardDoubleArrowLeftIcon className={styles.icon} />
                <h1>Back</h1>
              </div>
            </div>
          </div>

          <div className={styles.profileNavigation}>
            <div
              className={`${styles.link} ${activeComponent === "profile" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("profile")}
            >
              <h1 className={styles.h1}>Profile</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "attendance" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("attendance")}
            >
              <h1 className={styles.h1}>Attendance</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "fees" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("fees")}
            >
              <h1 className={styles.h1}>Fees</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "individualTest" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("individualTest")}
            >
              <h1 className={styles.h1}>Individual Test</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "groupWork" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("groupWork")}
            >
              <h1 className={styles.h1}>Group Work</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "projectWork" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("projectWork")}
            >
              <h1 className={styles.h1}>Project Work</h1>
            </div>

            <div
              className={`${styles.link} ${activeComponent === "classTest" ? styles.activeLink : ""}`}
              onClick={() => navigateToComp("classTest")}
            >
              <h1 className={styles.h1}>Class Test</h1>
            </div>
          </div>

          <div className={styles.studentProfile}>
            <div className={styles.studentPhoto}>
              <Image
                src={DriverPhoto}
                alt="driver-profile"
                className={styles.image}
              />
            </div>

            <div className={styles.studentName}>
              <h1>{`${selectedStudent?.FirstName} ${selectedStudent?.LastName}`}</h1>
            </div>


            <div className={styles.editContainer}>
              <div
                className={styles.edit}
                onClick={() => setEditMode(!editMode)}
              >
                <EditIcon className={styles.editIcon} />
                <p>Edit</p>
              </div>

              <div className={styles.saveChangesButton}>
                <button
                  className={editMode ? styles.saveChangesButtonActive : ""}
                  disabled={editMode ? false : true}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

            <div className={styles.studentFeesContainer}>
              <div className={styles.studentFeesHeader}>
                <div className={styles.header1}>
                  <label>Full Amount</label>
                  <h1>{`Ghc ${selectedStudent?.SchoolFees?.TotalFees || "0"}`}</h1>
                </div>

                <div className={styles.header2}>
                  <label>Balance Amount</label>
                  <h1>{`Ghc ${balanceFee}`}</h1>
                </div>
              </div>

              <div className={styles.paymentHistory}>
                <h1>Payment History</h1>
                {paymentHistoryArray.map((payment, index) => (
                  <div className={styles.paymentHistoryFields} key={index}>
                    <div className={styles.paymentDate}>
                      <label>Payment Date</label>
                      <h1>{payment?.DateOfPayment || ""}</h1>
                    </div>

                    <div className={styles.paymentDate}>
                      <label>Payment Amount</label>
                      <h1>{`Ghc ${payment?.AmountOfPayment || ""}`}</h1>
                    </div>

                    <div className={styles.paymentDate}>
                      <label>Semester</label>
                      <h1>{`${payment?.SemesterFee || ""}`}</h1>
                    </div>

                    <div className={styles.paymentDate}>
                      <label>Made By</label>
                      <h1>{payment?.by}</h1>
                    </div>

                    <div className={styles.paymentDate}>
                      <label>Receiver</label>
                      <h1>{payment?.by}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default StudentFees;

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
