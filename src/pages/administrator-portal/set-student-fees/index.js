import React, { useState, useEffect } from "react";
import styles from "../../../styles/admin_portal_css/setStudentFee.module.css";
import Layout from "../layout";
import { db } from "../../../lib/firebase";
import { ref, update, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withSession from "@/lib/session";

function Index() {
  const [studentData, setStudentData] = useState([]);
  const [classValues, setClassValues] = useState({}); 
  const [variousClasses, setVariousClasses] = useState([
    "Creche",
    "Nursery 1",
    "Nursery 2",
    "K.G 1",
    "K.G 2",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
  ]);

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
        console.log("error fetching");
        setStudentData([]);
      }
    };
    fetchData();
  }, []);

  const handleClassSubmit = async (className) => {
    try {
      const updates = {};

      studentData.forEach((student) => {
        if (student.Class === className) {
          updates[student.key] = {
            ...student,
            SchoolFees: {
              TotalFees: parseInt(classValues[className] || 0, 10),
              Payments: student.SchoolFees ? student.SchoolFees.Payments || 0 : 0,
            },
          };
        }
      });

      const dbRef = ref(db, "japsstudents");
      await update(dbRef, updates);

      toast.success(`Fees for ${className} updated successfully!`);
    } catch (error) {
      console.log("error updating SchoolFees", error);
      toast.error("Error updating SchoolFees");
    }
  };

  const handleInputChange = (className, value) => {
    setClassValues((prevValues) => ({
      ...prevValues,
      [className]: value,
    }));
  };

  const updateFeeValues = async (e) => {
    e.preventDefault();
    for (let className of variousClasses) {
      await handleClassSubmit(className);
    }
  };

  useEffect(() => {
    const initialClassValues = {};
    variousClasses.forEach((className) => {
      const student = studentData.find((student) => student.Class === className && student.SchoolFees);
      if (student) {
        initialClassValues[className] = student.SchoolFees.TotalFees;
      }
    });
    setClassValues(initialClassValues);
  }, [studentData, variousClasses]);

  return (
    <>
      <Layout>
        <div className={styles.setFeesContainer}>
          <div className={styles.setFeesContent}>
          
            <div className={styles.feeBody}>
              <form onSubmit={updateFeeValues}>
                <div className={styles.feeBodyItems}>
                  {variousClasses.map((classItem, index) => (
                    <div className={styles.item} key={index}>
                      <div className={styles.itemName}>
                        <h1>{classItem}</h1>
                      </div>
                      <div className={styles.inputField}>
                        <input
                          type="number"
                          value={classValues[classItem] || ""}
                          onChange={(e) =>
                            handleInputChange(classItem, e.target.value)
                          }
                        />
                      </div>

                      <div className={styles.submitBtn}>
                        <button type="button" onClick={() => handleClassSubmit(classItem)}>
                          {classValues[classItem] ? "Edit" : "Submit"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="submit" className={styles.updateAllBtn}>
                  Update All Fees
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
      <ToastContainer />
    </>
  );
}

export default Index;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
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
