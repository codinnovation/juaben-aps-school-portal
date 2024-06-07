import React from "react";
import { useState, useEffect } from "react";
import styles from "../../../styles/admin_portal_css/studentUpdate.module.css";
import Head from "next/head";
import "firebase/database";
import { auth, db } from "../../../lib/firebase";
import { ref, set } from "firebase/database";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateForm({ closeUpdateForm, selectedStudent }) {
  const [formSection, setFormSection] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState(selectedStudent);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formSection < InputFields.length) {
      setFormSection(formSection + 1);
    } else {
      try {
        const studentRef = ref(db, `japsstudents/${selectedStudent.key}`);
        await set(studentRef, formData);
        toast.success(`Student Profile updated`);
        router.push("/admin_portal/studentList");
      } catch (error) {
        console.error("Error updating student:");
        setSuccessModal("Failed to update student details");
        setShowSuccessModal(true);
      }
      setShowSuccessModal(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const InputFields = [
    [
      {
        label: "First Name",
        name: "FirstName",
        placeholder: "Student First Name",
        type: "text",
      },
      {
        label: "Middle Name",
        name: "MiddleName",
        placeholder: "Student Middle Name",
        type: "text",
      },
      {
        label: "Last Name",
        name: "LastName",
        placeholder: "Student Last Name",
        type: "text",
      },
      {
        label: "Class",
        name: "Class",
        type: "select",
        options: [
          "",
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
        ],
        onChange: (selectedClass) =>
          handleInputChange({
            target: { name: "Class", value: selectedClass },
          }),
      },

      {
        label: "Student Residence",
        name: "StudentResidence",
        placeholder: "Student Residence",
        type: "text",
      },

      {
        label: "Date of Birth",
        name: "DOB",
        placeholder: "Date of  Birth",
        type: "date",
      },
      {
        label: "Gender",
        name: "Gender",
        placeholder: "Student Gender",
        type: "select",
        options: ["", "Female", "Male"],
        onChange: (selectedGender) =>
          handleInputChange({
            target: { name: "Gender", value: selectedGender },
          }),
      },
      {
        label: "Enrollment Date",
        name: "EnrollmentDate",
        placeholder: "Enrollment Date",
        type: "date",
      },

      {
        label: "Religion",
        name: "Religion",
        placeholder: "Student's Religion",
        type: "text",
      },

      {
        label: "Denomination",
        name: "Denomination",
        placeholder: "Student's Denomination",
        type: "text",
      },
    ],

    [
      {
        label: "Parent's/Guardian's Name",
        name: "guardianName",
        placeholder: "Parent's/Guardian's Name",
        type: "text",
      },

      {
        label: "Parent's/Guardian's Residence",
        name: "guardianResidence",
        placeholder: "Parent's/Guardian's Residence",
        type: "text",
      },
      {
        label: "Parent's/Guardian's Phone",
        name: "guardianPhone",
        placeholder: "Parent's/Guardian's Phone",
        type: "text",
      },

      {
        label: "Parent's/Guardian's Other Phone",
        name: "guardianOtherPhone",
        placeholder: "Parent's/Guardian's Other Phone",
        type: "text",
      },
      {
        label: "Student NHIS Id No",
        name: "NHISno",
        placeholder: "Student NHIS Number",
        type: "text",
      },

      {
        label: "Student NHIS Id Name",
        name: "NHISName",
        placeholder: "NHIS Id Name",
        type: "text",
      },

      {
        label: "Student Former School",
        name: "FormerSchool",
        placeholder: "Student Former School",
        type: "text",
      },

      {
        label: "Student Cause Of Leaving",
        name: "CauseOfLeaving",
        placeholder: "Cause Of Leaving",
        type: "text",
      },
    ],
  ];

  useEffect(() => {
    if (selectedStudent) {
      setFormData(selectedStudent);
    }
  }, [selectedStudent]);

  return (
    <>
      {selectedStudent && (
        <>
          <Head>
            <title>Juaben APS - Update Student</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <div className={styles.container}>
            <div className={styles.containerItems}>
              <div className={styles.containerHeader}>
                <h1>Update Student</h1>
                <h1 onClick={closeUpdateForm}>Exit</h1>
              </div>

              <div className={styles.inputFieldsContainer}>
                <form onSubmit={handleFormSubmit}>
                  <div className={styles.inputFields}>
                    {InputFields[formSection - 1].map((field, index) => (
                      <div className={styles.field} key={index}>
                        <label>{field.label}</label>
                        {field.type === "select" ? (
                          <select
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                          >
                            {field.options.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className={styles.navigateContainer}>
                    <div className={styles.buttons}>
                      {formSection > 1 && (
                        <button onClick={() => setFormSection(formSection - 1)}>
                          Previous
                        </button>
                      )}
                      {formSection <= 1 && (
                        <button onClick={() => setFormSection(formSection + 1)}>
                          Next
                        </button>
                      )}

                      {formSection === InputFields.length && (
                        <button type="submit">Submit</button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <ToastContainer />
        </>
      )}
    </>
  );
}

export default UpdateForm;
