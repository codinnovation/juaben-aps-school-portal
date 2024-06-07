import React, { useState, useEffect } from "react";
import styles from "../../../styles/accountant_portal/studentFees.module.css";
import { ref, push, get } from "firebase/database";
import { db } from "../../../lib/firebase";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

function StudentFees({ selectedStudent, hideStudentProfilePage }) {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [semesterFee, setSemesterFee] = useState("");
  const [by, setBy] = useState("");
  const [balanceFee, setBalanceFee] = useState();
  const [paymentList, setPaymentList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const router = useRouter();

  const addPaymentOfFee = async () => {
    const studentRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/SchoolFees/Payments`
    );

    const newPaymentOfFees = {
      DateOfPayment: paymentDate,
      AmountOfPayment: parseInt(paymentAmount),
      SemesterFee: semesterFee,
      By: by,
    };

    try {
      await push(studentRef, newPaymentOfFees);

      // Update the balance immediately after making the payment
      const updatedBalance = balanceFee - parseInt(paymentAmount);
      setBalanceFee(updatedBalance);
      console.log("Payment Received successfully");
      toast.success(
        `Payment made for Ghc${paymentAmount} - ${selectedStudent?.FirstName} `
      );
      router.push("/account_portal");
    } catch (error) {
      console.error("Error Adding Payment:");
    }
  };

  useEffect(() => {
    if (
      selectedStudent &&
      selectedStudent.SchoolFees &&
      selectedStudent.SchoolFees.Payments
    ) {
      const paymentKeys = Object.keys(selectedStudent.SchoolFees.Payments);

      const totalFees = selectedStudent.SchoolFees.TotalFees || 0;
      const paidAmount = paymentKeys.reduce((total, paymentKey) => {
        const payment = selectedStudent.SchoolFees.Payments[paymentKey];
        return total + payment.AmountOfPayment;
      }, 0);

      const updatedBalance = totalFees - paidAmount;
      setBalanceFee(updatedBalance);
    } else {
      setBalanceFee(0);
    }
  }, [selectedStudent, paymentList, paymentAmount]);

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
          setPaymentList(dataArray);
        } else {
          setPaymentList([]);
        }
      } catch (error) {
        console.error("Error fetching data:");
        setPaymentList([]);
      }
    };

    fetchData();

    const fetchInterval = setInterval(fetchData, 1000);
    return () => clearInterval(fetchInterval);
  });

  return (
    <>
      <div className={styles.feeContainer}>
        <div className={styles.feeContainerItems}>
          <button onClick={hideStudentProfilePage}>Back To List</button>
          <div className={styles.feeContainerHeader}>
            <h1>School Fees</h1>
          </div>

          <div className={styles.feeContainerBody}>
            <div className={styles.feeContainerBodyHeader}>
              <h1>{`Total Fees  ${
                selectedStudent?.SchoolFees?.TotalFees || 0
              }`}</h1>
              <h1>{`Remaining  ${balanceFee}`}</h1>
            </div>

            <div className={styles.addPaymentContainer}>
              <div className={styles.field}>
                <input
                  placeholder="Date of Payment"
                  value={paymentDate}
                  name="paymentDate"
                  type="date"
                  onChange={(e) => setPaymentDate(e.target.value)}
                />

                <input
                  placeholder="Payment amount"
                  value={paymentAmount}
                  name="paymentDate"
                  type="number"
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />

                <input
                  placeholder="Semester"
                  value={semesterFee}
                  name="semesterFee"
                  type="number"
                  onChange={(e) => setSemesterFee(e.target.value)}
                />

                <input
                  placeholder="Made by"
                  value={by}
                  name="by"
                  type="text"
                  onChange={(e) => setBy(e.target.value)}
                />
              </div>

              <div className={styles.submitBtn}>
                <button onClick={handleOpenModal}>Pay</button>
              </div>
            </div>
          </div>

          <div className={styles.paymentHistory}>
            <h1>Payment History</h1>
            {paymentList.map((payment, index) => (
              <div className={styles.paymentHistoryFields} key={index}>
                <div className={styles.paymentDate}>
                  <label>Payment Date</label>
                  <h1>{payment?.DateOfPayment || "No"}</h1>
                </div>

                <div className={styles.paymentDate}>
                  <label>Payment Amount</label>
                  <h1>{`Ghc ${payment?.AmountOfPayment || "No"}`}</h1>
                </div>

                <div className={styles.paymentDate}>
                  <label>Semester</label>
                  <h1>{`${payment?.SemesterFee || "No"}`}</h1>
                </div>

                <div className={styles.paymentDate}>
                  <label>By</label>
                  <h1>{`${payment?.By || "No"}`}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle
          style={{ fontSize: "15px", textTransform: "uppercase" }}
        >{`Proceed payment`}</DialogTitle>
        <DialogContent>
          <ul
            style={{
              textDecoration: "none",
              listStyle: "none",
              fontFamily: "sans-serif",
            }}
          >
            <Button onClick={addPaymentOfFee}>Yes</Button>
            <Button onClick={handleCloseModal}>No</Button>
          </ul>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
}

export default StudentFees;
