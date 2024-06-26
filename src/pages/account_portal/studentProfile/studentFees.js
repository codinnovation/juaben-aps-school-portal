import React, { useState, useEffect } from "react";
import styles from "../../../styles/accountant_portal/studentFees.module.css";
import { ref, push, get, set } from "firebase/database";
import { db } from "../../../lib/firebase";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import withSession from "@/lib/session";

function StudentFees({ selectedStudent, hideStudentProfilePage, user }) {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [semesterFee, setSemesterFee] = useState("");
  const [by, setBy] = useState(user?.email);
  const [madeBy, setMadeBy] = useState("");
  const [balanceFee, setBalanceFee] = useState(0);
  const [paymentList, setPaymentList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editPaymentId, setEditPaymentId] = useState(null);
  const [editPaymentData, setEditPaymentData] = useState({
    editPaymentDate: "",
    editPaymentAmount: "",
    editSemesterFee: "",
    editMadeBy: "",
    editBy: "",
  });

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
      MadeBy: madeBy,
    };

    try {
      await push(studentRef, newPaymentOfFees);

      const updatedBalance = balanceFee - parseInt(paymentAmount);
      setBalanceFee(updatedBalance);
      toast.success(
        `Payment made for Ghc${paymentAmount} - ${selectedStudent?.FirstName}`
      );
      router.push("/account_portal");
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  const updatePaymentData = async () => {
    const paymentRef = ref(
      db,
      `/japsstudents/${selectedStudent.key}/SchoolFees/Payments/${editPaymentId}`
    );

    try {
      await set(paymentRef, {
        ...paymentList.find((p) => p.key === editPaymentId),
        DateOfPayment: editPaymentData.editPaymentDate,
        AmountOfPayment: parseInt(editPaymentData.editPaymentAmount),
        SemesterFee: editPaymentData.editSemesterFee,
        MadeBy: editPaymentData.editMadeBy,
        By: editPaymentData.editBy,
      });
      setEditPaymentId(null);
      setEditPaymentData({
        editPaymentDate: "",
        editPaymentAmount: "",
        editSemesterFee: "",
        editMadeBy: "",
        editBy: "",
      });
      toast.success("Payment data updated successfully");
    } catch (error) {
      console.error("Error updating payment data:", error);
      toast.error("Error updating payment data");
    }
  };

  useEffect(() => {
    if (selectedStudent && selectedStudent.SchoolFees) {
      const { Payments, TotalFees } = selectedStudent.SchoolFees;
      const totalFees = TotalFees || 0;

      if (Payments) {
        const paymentKeys = Object.keys(Payments);
        const paidAmount = paymentKeys.reduce((total, paymentKey) => {
          const payment = Payments[paymentKey];
          return total + (payment.AmountOfPayment || 0);
        }, 0);

        const updatedBalance = totalFees - paidAmount;
        setBalanceFee(updatedBalance);
      } else {
        setBalanceFee(totalFees);
      }
    } else {
      setBalanceFee(0);
    }
  }, [selectedStudent]);

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
        console.error("Error fetching data:", error);
        setPaymentList([]);
      }
    };

    fetchData();

    const fetchInterval = setInterval(fetchData, 1000);
    return () => clearInterval(fetchInterval);
  }, [selectedStudent]);

  return (
    <>
      <div className={styles.feeContainer}>
        <div className={styles.feeContainerItems}>
          <button onClick={hideStudentProfilePage} style={{ padding: "10px" }}>
            Back To List
          </button>
          <div className={styles.feeContainerHeader}>
            <h1>School Fees</h1>
          </div>

          <div className={styles.feeContainerBody}>
            <div className={styles.feeContainerBodyHeader}>
              <h1>{`Total Fees: ${
                selectedStudent?.SchoolFees?.TotalFees || 0
              }`}</h1>
              <h1>{`Remaining: ${
                balanceFee >= 0
                  ? `Ghc ${balanceFee} (-)`
                  : `Ghc ${balanceFee} (+)`
              }`}</h1>
            </div>

            <div className={styles.addPaymentContainer}>
              <div className={styles.field}>
                <input
                  placeholder="Date of Payment"
                  value={paymentDate}
                  name="paymentDate"
                  required
                  type="date"
                  onChange={(e) => setPaymentDate(e.target.value)}
                />

                <input
                  placeholder="Payment amount"
                  value={paymentAmount}
                  name="paymentDate"
                  type="number"
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  required
                />

                <input
                  placeholder="Term"
                  value={semesterFee}
                  name="semesterFee"
                  type="number"
                  onChange={(e) => setSemesterFee(e.target.value)}
                  required
                />

                <input
                  placeholder="Made By"
                  value={madeBy}
                  name="madeBy"
                  type="text"
                  onChange={(e) => setMadeBy(e.target.value)}
                  required
                />

                <input
                  placeholder="Received by"
                  value={`${user?.email} - ${user?.displayName}` || "No User"}
                  disabled
                  name="by"
                  type="text"
                  onChange={(e) => setBy(e.target.value)}
                />
              </div>

              <div className={styles.submitBtn}>
                <button onClick={handleOpenModal}>Pay Amount</button>
              </div>
            </div>
          </div>

          <div className={styles.paymentHistory}>
            <h1>Payment History</h1>
            {paymentList.map((payment) => (
              <div className={styles.paymentHistoryFields} key={payment.key}>
                <div className={styles.paymentDate}>
                  <label>Payment Date</label>
                  {editPaymentId === payment.key ? (
                    <input
                      type="date"
                      value={editPaymentData.editPaymentDate}
                      onChange={(e) =>
                        setEditPaymentData({
                          ...editPaymentData,
                          editPaymentDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <h1>{payment?.DateOfPayment || "No"}</h1>
                  )}
                </div>

                <div className={styles.paymentDate}>
                  <label>Payment Amount</label>
                  {editPaymentId === payment.key ? (
                    <input
                      type="number"
                      value={editPaymentData.editPaymentAmount}
                      onChange={(e) =>
                        setEditPaymentData({
                          ...editPaymentData,
                          editPaymentAmount: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <h1>{`Ghc ${payment?.AmountOfPayment || "No Amount"}`}</h1>
                  )}
                </div>

                <div className={styles.paymentDate}>
                  <label>Term</label>
                  {editPaymentId === payment.key ? (
                    <input
                      type="number"
                      value={editPaymentData.editSemesterFee}
                      onChange={(e) =>
                        setEditPaymentData({
                          ...editPaymentData,
                          editSemesterFee: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <h1>{`${payment?.SemesterFee || "No Semester"}`}</h1>
                  )}
                </div>

                <div className={styles.paymentDate}>
                  <label>Made By</label>
                  {editPaymentId === payment.key ? (
                    <input
                      type="text"
                      value={editPaymentData.editMadeBy}
                      onChange={(e) =>
                        setEditPaymentData({
                          ...editPaymentData,
                          editMadeBy: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <h1>{payment?.MadeBy || "No"}</h1>
                  )}
                </div>

                <div className={styles.paymentDate}>
                  <label>Receiver</label>
                  {editPaymentId === payment.key ? (
                    <input
                      type="text"
                      value={editPaymentData.editBy}
                      onChange={(e) =>
                        setEditPaymentData({
                          ...editPaymentData,
                          editBy: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <h1>{payment?.By || "No"}</h1>
                  )}
                </div>

                <div className={styles.paymentActions}>
                  {editPaymentId === payment.key ? (
                    <button onClick={updatePaymentData}>Save</button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditPaymentId(payment.key);
                        setEditPaymentData({
                          editPaymentDate: payment?.DateOfPayment,
                          editPaymentAmount: payment?.AmountOfPayment,
                          editSemesterFee: payment?.SemesterFee,
                          editMadeBy: payment?.MadeBy,
                          editBy: payment?.By,
                        });
                      }}
                    >
                      Edit
                    </button>
                  )}
                  {editPaymentId === payment.key && (
                    <button onClick={() => setEditPaymentId(null)}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to make this payment?</p>
          <Button onClick={addPaymentOfFee}>Yes</Button>
          <Button onClick={handleCloseModal}>No</Button>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  );
}

export default StudentFees;
