import React, { useState, useEffect } from "react";
import styles from "../../../styles/parent_portal_css/studentFee.module.css";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

function StudentFees({ verifiedStudentFees }) {
  const [totalPayments, setTotalPayments] = useState(0);
  const [paymentsArray, setPaymentsArray] = useState([]);

  useEffect(() => {
    // Convert Payments to an array if it's not already
    const payments = Array.isArray(verifiedStudentFees?.Payments)
      ? verifiedStudentFees.Payments
      : verifiedStudentFees?.Payments
      ? Object.values(verifiedStudentFees.Payments)
      : [];

    setPaymentsArray(payments);

    const total = payments.reduce(
      (acc, payment) => acc + (payment.AmountOfPayment || 0),
      0
    );
    setTotalPayments(total);
  }, [verifiedStudentFees]);

  const remainingFees = verifiedStudentFees?.TotalFees - totalPayments;

  return (
    <>
      <div className={styles.studentFeeContainer}>
        <div className={styles.studentFeeContents}>
          <div className={styles.feesHeader}>
            <div className={styles.totalContainer}>
              <AccountBalanceWalletIcon className={styles.icon} />
              <h1>{`Total: Ghc${verifiedStudentFees?.TotalFees}`}</h1>
            </div>
            <div className={styles.remainingContainer}>
              <AccountBalanceWalletIcon className={styles.icon} />
              <h1>{`Remaining: Ghc${remainingFees?.toFixed(2)}`}</h1>
            </div>
          </div>

          <div className={styles.paymentHistory}>
            <h1>Payment History</h1>
            {paymentsArray.map((payment, index) => (
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
