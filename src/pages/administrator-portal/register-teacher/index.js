import React from "react";
import { useState } from "react";
import Head from "next/head";
import "firebase/database";
import styles from "../../../styles/admin_portal_css/teacherRegistration.module.css";
import { db } from "../../../lib/firebase";
import { push, ref } from "firebase/database";
import Layout from "../layout";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegistrationForm() {
  const [formSection, setFormSection] = useState(1);
  const router = useRouter();

  const [formData, setFormData] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    ClassToTeacher: "",
    TeacherPhone: "",
    Gender: "",
    DateOfAppointment: "",
    Qualification: "",
    YearOfQualification: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formSection < InputFields.length) {
      setFormSection(formSection + 1);
    } else {
      try {
        const newStudentRef = push(ref(db, "japsteachers"), formData);
        const newStudentKey = newStudentRef.key;
        toast.success(`Teacher admitted`);
        router.push("/administrator-portal/teachers-list");
        return newStudentKey;
      } catch (error) {
        console.error("Error submitting Teacher:");
        toast.error("Error occured in addmiting Teacher");
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
        placeholder: "Teacher First Name",
      },
      {
        label: "Middle Name",
        name: "MiddleName",
        placeholder: "Teacher Middle Name",
      },
      {
        label: "Last Name",
        name: "LastName",
        placeholder: "Teacher Last Name",
      },
      {
        label: "Class To Handle",
        name: "ClassToTeacher",
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
            target: { name: "ClassToTeacher", value: selectedClass },
          }),
      },

      {
        label: "Phone Number",
        name: "TeacherPhone",
        placeholder: "Teacher Phone",
      },

      {
        label: "Gender",
        name: "Gender",
        placeholder: "Teacher Gender",
        type: "select",
        options: [
          "",
          "Male",
          "Female",
        ],
      },

      {
        label: "Date Of Appointment",
        name: "DateOfAppointment",
        placeholder: "Date Of Appointment",
        type: "date"
      },
      {
        label: "Qualification",
        name: "Qualification",
        placeholder: "Qualification",
        type: "select",
        options: [
          "",
          "O'LEVEL",
          "SSCE",
          "WASSCE",
          "DIPLOMA",
          "HND",
          "DEGREE",
          "MASTERS DEGREE",
        ],
        onChange: (selectedQua) =>
          handleInputChange({
            target: { name: "ClassToTeacher", value: selectedQua },
          }),
      },
      {
        label: "Year of Qualification",
        name: "YearOfQualification",
        placeholder: "Year of Qualification",
        type: "date"
      },
    ],


  ];

  return (
    <>
      <Layout>
        <Head>
          <title>Juaben APS - Admit Teacher</title>
        </Head>
        <div className={styles.container}>
          <div className={styles.containerItems}>
            <div className={styles.containerHeader}>
              <h1>Admit Teacher</h1>
              <h1 onClick={handleCloseForm}>Exit</h1>
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
                    {formSection < 1 && (
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
