import React, { useState, useEffect } from "react";
import styles from "../../../styles/parent_portal_css/studentFee.module.css";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

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
      <div className={styles.studentFeeContainer}>
        <div className={styles.studentFeeContents}>
          <div className={styles.feesHeader}>
            <div className={styles.totalContainer}>
              <AccountBalanceWalletIcon className={styles.icon} />
              <h1>{`Total: Ghc1.00`}</h1>
            </div>
            <div className={styles.remainingContainer}>
              <AccountBalanceWalletIcon className={styles.icon} />
              <h1>{`Remaining: Ghc5.00`}</h1>
            </div>
          </div>

          <div className={styles.paymentHistory}>
            <div className={styles.header}>
              <h1>Payment History</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentFees;
