import React from "react";
import styles from "../../../styles/teachers_portal_css/studentFees.module.css";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function StudentFees() {
  return (
    <>
      <div className={styles.studentFeeContainer}>
         <div className={styles.studentFeeContents}>
            <div className={styles.feesHeader}>
               <div className={styles.totalContainer}>
                  <AccountBalanceWalletIcon className={styles.icon}/>
                  <h1>{`Total: Ghc1.00`}</h1>
               </div>
               <div className={styles.remainingContainer}>
               <AccountBalanceWalletIcon className={styles.icon}/>
               <h1>{`Remaining: Ghc5.00`}</h1>
               </div>
            </div>
         </div>
      </div>
    </>
  );
}

export default StudentFees;
