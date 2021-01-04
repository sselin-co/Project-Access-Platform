import React, { useEffect } from "react";
import styles from "../../../styles/Home.module.css";
import Head from "next/head";
import PaNavbarAdmin from "../../../components/pa-navbar-admin";
import { useSession } from "next-auth/client";
import AssignmentTable from "../../../components/admin-assignment-table";
import Footer from "../../general/footer";

export default function StudentAssignments() {
  const [session, loading] = useSession();
  return (
    <div className={styles.container}>
      {" "}
      <Head>
        <title>Student Assignments</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>
      {session && session.user.name == "admin" && (
        <>
          <PaNavbarAdmin email={session.user.email}></PaNavbarAdmin>

          <main className={styles.main}>
            <AssignmentTable></AssignmentTable>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
