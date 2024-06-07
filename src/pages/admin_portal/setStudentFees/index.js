import React, { useState, useEffect } from "react";
import styles from "../../../styles/admin_portal_css/setStudentFee.module.css";
import Layout from "../layout";
import { db, auth } from "../../../lib/firebase";
import { ref, update, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index() {
  const [studentData, setStudentData] = useState([]);
  const [classValues, setClassValues] = useState({}); // Object to store class values
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
      const updatedStudentData = studentData.map((student) => {
        if (student.Class === className && !student.SchoolFees) { // Check if fees are not already set
          return {
            ...student,
            SchoolFees: {
              TotalFees: parseInt(classValues[className] || 0),
              Payments: 0,
            },
          };
        }
        return student;
      });
  
      const updates = {};
      updatedStudentData.forEach((student) => {
        if (student.SchoolFees) { // Only update if fees are not already set
          const { key, ...rest } = student;
          updates[key] = { ...rest, SchoolFees: student.SchoolFees };
        }
      });
  
      const dbRef = ref(db, "japsstudents");
      await update(dbRef, updates);
  
      setStudentData(updatedStudentData);
  
      toast.success(`Fees for ${className} submitted successfully!`);
    } catch (error) {
      console.log("error updating SchoolFees");
      toast.error("Error updating SchoolFees");
    }
  };
  

  const handleInputChange = (className, value) => {
    setClassValues((prevValues) => ({
      ...prevValues,
      [className]: value,
    }));
  };

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div className={styles.containerItems}>
            <div className={styles.containerHeader}>
              <h1>Set Student Fees</h1>
            </div>

            <div className={styles.containerBody}>
              <div className={styles.items}>
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
                      <button onClick={() => handleClassSubmit(classItem)}>
                        Submit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <ToastContainer />
    </>
  );
}

export default Index;
