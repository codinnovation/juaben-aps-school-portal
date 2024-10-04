import React, { useEffect, useState } from "react";
import styles from "../../../styles/admin_portal_css/studentFees.module.css";
import { db } from "../../../lib/firebase";
import { ref, get } from "firebase/database";

function StudentFees({ selectedStudent}) {
  const [paymentHistoryArray, setPaymentHistoryArray] = useState([]);
  const [balanceFee, setBalanceFee] = useState();

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
      <div className={styles.studentProfilePageContainer}>
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
    </>
  );
}

export default StudentFees;
