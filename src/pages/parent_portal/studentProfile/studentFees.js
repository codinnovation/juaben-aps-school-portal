import React, { useState, useEffect } from "react";
import styles from "../../../styles/parent_portal_css/studentFee.module.css";

function StudentFees({ varifiedStudent }) {
  const [balance, setBalance] = useState(0);
  const [paymentsList, setPaymentsList] = useState([]);

  useEffect(() => {
    if (varifiedStudent?.length > 0 && varifiedStudent[0]?.SchoolFees) {
      const schoolFees = varifiedStudent[0]?.SchoolFees;

      // Extract balance and payments list
      const totalFees = schoolFees?.TotalFees || 0;
      const payments = schoolFees?.Payments;

      // Calculate balance
      const balance = payments
        ? totalFees -
          Object.values(payments).reduce(
            (total, payment) => total + payment?.AmountOfPayment,
            0
          )
        : totalFees;

      const paymentsList = payments ? Object.values(payments) : [];

      setBalance(balance);
      setPaymentsList(paymentsList);
    }
  }, [varifiedStudent]);

  return (
    <>
      {varifiedStudent?.length > 0 ? (
        <div className={styles.feeContainer}>
          <div className={styles.feeContainerItems}>
            <div className={styles.feeContainerHeader}>
              <h1>School Fees</h1>
            </div>

            <div className={styles.feeContainerBody}>
              <div className={styles.feeContainerBodyHeader}>
                <h1>{`Total Fees Ghc${
                  varifiedStudent[0]?.SchoolFees?.TotalFees || "00.00"
                }`}</h1>
                <h1>{`Balance  Ghc${balance || "00.00"}`}</h1>
              </div>

              <div className={styles.subPaymentContainer}>
                <h1>Payments History</h1>

                {paymentsList.map((payment, index) => (
                  <ul key={index}>
                    <li>{`Ghc ${payment?.AmountOfPayment}`}</li>
                    <li>{`Date ${payment?.DateOfPayment}`}</li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default StudentFees;
