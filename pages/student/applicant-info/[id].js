import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../general/footer";
import styles from "../../../styles/Home.module.css";
import PaNavbarStudent from "../../../components/pa-navbar-student.js";
import DisplayApplicationInfo from "../../../components/application-info";
import Student from "../../api/utils/Student";

/*
ApplicationInfo: dynamically routed page for applicant information. 
*/

export default function ApplicantInfo() {
  const router = useRouter();
  const studentId = router.query.id;
  const [email, setEmail] = useState("");

  useEffect(() => {
    Student.appIdReturn(studentId, "email").then((data) => {
      setEmail(data);
    })
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Student Info</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      <PaNavbarStudent email={email}></PaNavbarStudent>

      <main className={styles.main}>
        <DisplayApplicationInfo></DisplayApplicationInfo>
      </main>

      <Footer/>
    </div>
  );
}
