import React from "react";
import { useState } from "react";
import styles from "../../../styles/admin_portal_css/studentRegister.module.css";
import Head from "next/head";
import "firebase/database";
import { db } from "../../../lib/firebase";
import { push, ref } from "firebase/database";
import { useRouter } from "next/router";
import Layout from "../layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegistrationForm() {
  const router = useRouter();
  const [formSection, setFormSection] = useState(1);

  const generateRandomStudentNumber = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return randomNumber.toString();
  };

  const [formData, setFormData] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Class: "",
    StudentNumber: generateRandomStudentNumber(),
    NHISno: "",
    NHISName: "",
    StudentResidence: "",
    DOB: "",
    Gender: "",
    EnrollmentDate: "",
    Religion: "",
    Denomination: "",
    guardianName: "",
    guardianResidence: "",
    guardianPhone: "",
    guardianOtherPhone: "",
    Attendance: "",
    ClassScore: "",
    ClassTest: "",
    Homework: "",
    SemesterExams: "",
    SchoolFees: "",
    StudentNotification: "",
    FormerSchool: "",
    CauseOfLeaving: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formSection < InputFields.length) {
      setFormSection(formSection + 1);
    } else {
      try {
        const newStudentRef = push(ref(db, "japsstudents"), formData);
        const newStudentKey = newStudentRef.key;
        toast.success(`Student ${formData.StudentNumber} number admitted`);
        router.push("/administrator-portal/student-list");
        return newStudentKey;
      } catch (error) {
        toast.error("Error occured in addmiting student");
      }
    }
  };

  const handleCloseForm = () => {
    router.push({
      pathname: "/administrator-portal/",
    });
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
        type: "text",
      },
      {
        label: "Middle Name",
        name: "MiddleName",
        type: "text",
      },
      {
        label: "Last Name",
        name: "LastName",
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
        type: "text",
      },

      {
        label: "Date of Birth",
        name: "DOB",
        type: "date",
      },
      {
        label: "Gender",
        name: "Gender",
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
        type: "date",
      },

      {
        label: "Religion",
        name: "Religion",
        type: "text",
      },

      {
        label: "Denomination",
        name: "Denomination",
        type: "text",
      },

    ],

    [
      {
        label: "Parent's/Guardian's Name",
        name: "guardianName",
        type: "text",
      },

      {
        label: "Parent's/Guardian's Residence",
        name: "guardianResidence",
        type: "text",
      },
      {
        label: "Parent's/Guardian's Phone",
        name: "guardianPhone",
        type: "text",
      },

      {
        label: "Parent's/Guardian's Other Phone",
        name: "guardianOtherPhone",
        type: "text",
      },
      {
        label: "Student NHIS Id No",
        name: "NHISno",
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
        type: "text",
      },

      {
        label: "Student Cause Of Leaving",
        name: "CauseOfLeaving",
        type: "text",
      },
    ],
  ];

  return (
    <>
      <Layout>
        <Head>
          <title>Juaben APS - Admit Student</title>
        </Head>
        <div className={styles.container}>
          <div className={styles.containerItems}>
  
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
                    {formSection < InputFields.length && (
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
      </Layout>
    </>
  );
}

export default RegistrationForm;
