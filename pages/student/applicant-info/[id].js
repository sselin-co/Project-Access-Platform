import React from "react";
import Head from "next/head";
import { useSession } from 'next-auth/client'
import styles from "../../../styles/Home.module.css";
import PaNavbarStudent from "../../../components/pa-navbar-student.js";
import DisplayApplicantInfo from "../../../components/applicant-info";

/*
ApplicationInfo: dynamically routed page for applicant information. 
*/

export default function ApplicantInfo() {
  const [session, loading] = useSession();
  // const [username, setUserName] = useState("");

  // useEffect(() => {
  //   console.log(session.user.email);
  //   setUserName(session.user.email);
    
  // })
  //console.log(session);

  return (
    <div className={styles.container}>
      <Head>
        <title>Student Info</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      <PaNavbarStudent email={session.user.email}></PaNavbarStudent>

      <main className={styles.main}>
        <DisplayApplicantInfo></DisplayApplicantInfo>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
