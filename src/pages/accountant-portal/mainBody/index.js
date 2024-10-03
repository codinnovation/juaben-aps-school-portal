import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/accountant_portal/mainbody.module.css";
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SchoolIcon from '@mui/icons-material/School';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const data = [
  { name: 'Jan', uv: 4000 },
  { name: 'Feb', uv: 3000 },
  { name: 'Mar', uv: 2000 },
];


function Index({ studentData, teachersData }) {
  const router = useRouter()

  return (
    <>
      <div className={styles.mainbodyContainer}>
        <div className={styles.mainbodyContent}>
          <div className={styles.boxContainer}>
            <div className={styles.header}>
              <SchoolIcon className={styles.icon} />

              <div className={styles.headerWrapper}>
                <h1>Total Students</h1>
                <p>{studentData?.length}</p>
              </div>
            </div>

            <div className={styles.bottomText} onClick={() => router.push("/accountant-portal/student-list")}>
              <VisibilityIcon className={styles.icon} />
              <p>See student list</p>
            </div>
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.header}>
              <PeopleOutlineIcon className={styles.icon} />

              <div className={styles.headerWrapper}>
                <h1>Total Teachers</h1>
                <p>{teachersData?.length}</p>
              </div>
            </div>

            <div className={styles.bottomText}>
              <VisibilityIcon className={styles.icon} />
              <p>See Teahcer&apos;s list</p>
            </div>
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.header}>
              <WorkIcon className={styles.icon} />

              <div className={styles.headerWrapper}>
                <h1>Non Working Staff</h1>
                <p>10</p>
              </div>
            </div>

            <div className={styles.bottomText}>
              <VisibilityIcon className={styles.icon} />
              <p>See student list</p>
            </div>
          </div>

          <div className={styles.boxContainer}>
            <div className={styles.header}>
              <MonetizationOnIcon className={styles.icon} />

              <div className={styles.headerWrapper}>
                <h1>Total Fee Paid</h1>
                <p>Ghc 989.00</p>
              </div>
            </div>

            <div className={styles.bottomText}>
              <VisibilityIcon className={styles.icon} />
              <p>See Detailed</p>
            </div>
          </div>
        </div>

        <div className={styles.secondContent}>

          <div className={styles.chartContainer}>
            <div className={styles.header}>
              <h1>School Fees </h1>
            </div>
            <LineChart className={styles.lineChart} width={900} height={500} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
