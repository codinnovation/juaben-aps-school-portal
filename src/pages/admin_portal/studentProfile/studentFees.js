import React, { useEffect, useState } from "react";
import styles from "../../../styles/admin_portal_css/studentFees.module.css";
import { db } from "../../../lib/firebase";
import { ref, push, get } from "firebase/database";
import Image from "next/image";

function StudentFees({
  hideStudentProfilePage,
  navigateToComp,
  selectedStudent,
}) {
  const [paymentHistoryArray, setPaymentHistoryArray] = useState([]);
  const [balanceFee, setBalanceFee] = useState();

  const navigateToStudentProfilePage = () => {
    navigateToComp("studentProfile");
  };

  const navigateToStudentGuardian = () => {
    navigateToComp("studentGuardian");
  };

  const navigateToStudentAttendance = () => {
    navigateToComp("studentAttendance");
  };

  const navigateToStudentClassScore = () => {
    navigateToComp("studentClassScore");
  };

  const navigateToStudentHealth = () => {
    navigateToComp("studentHealth");
  };

  const navigateToStudentClassTest = () => {
    navigateToComp("studentClassTest");
  };

  const navigateToStudentHomework = () => {
    navigateToComp("studentHomework");
  };

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

          // Calculate the total payment amount
          const totalPayment = dataArray.reduce(
            (acc, payment) => acc + (payment.AmountOfPayment || 0),
            0
          );

          // Set the balance fee by subtracting total payment from TotalFees
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
  }, []);

  return (
    <>
      <div className={styles.studentProfilePageContainer}>
        <div className={styles.navigationContainer}>
          <div className={styles.studentPhoto}>
            <Image
              src="/student5651.jpg"
              width={200}
              height={150}
              alt="student_image"
            />
          </div>
          <div className={styles.stundentName}>
          <h1>{`${selectedStudent?.FirstName || ""} ${
                selectedStudent?.MiddleName || ""
              } ${selectedStudent?.LastName || ""} `}</h1>
          </div>

          <div className={styles.studentNavLinks}>
            <ul>
              <li>
                <button onClick={navigateToStudentProfilePage}>
                  Student Profile
                </button>
              </li>
              <li>
                <button onClick={navigateToStudentHealth}>
                  Student Health
                </button>
              </li>

              <li>
                <button onClick={navigateToStudentGuardian}>
                  Student Guardian
                </button>
              </li>
              <li>
                <button onClick={navigateToStudentAttendance}>
                  Attendance
                </button>
              </li>

              <li>
                <button onClick={navigateToStudentClassScore}>
                  Class Scores
                </button>
              </li>

              <li>
                <button onClick={navigateToStudentClassTest}>Class Test</button>
              </li>

              <li>
                <button onClick={navigateToStudentHomework}>Home work</button>
              </li>
            </ul>
          </div>

          <div className={styles.backToList}>
            <button onClick={hideStudentProfilePage}>Back To List</button>
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
                  <h1>{payment?.DateOfPayment || "Null"}</h1>
                </div>

                <div className={styles.paymentDate}>
                  <label>Payment Amount</label>
                  <h1>{`Ghc ${payment?.AmountOfPayment || "Null"}`}</h1>
                </div>

                <div className={styles.paymentDate}>
                  <label>Semester</label>
                  <h1>{`${payment?.SemesterFee || "Null"}`}</h1>
                </div>

                <div className={styles.paymentDate}>
                  <label>By</label>
                  <h1>{`Accountant`}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentFees;
