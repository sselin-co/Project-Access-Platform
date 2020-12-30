import React from "react";
import { useSession } from 'next-auth/client'
import Head from "next/head";
import styles from "../styles/Home.module.css";
import PaNavbar from "../components/pa-navbar.js";
import StudentHome from "./student";
import AdminDashboard from "./admin/admin-dashboard";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
    {session && session.user.name == "student" && <StudentHome email={session.user.email}></StudentHome>}
    {session && session.user.name == "admin" && <AdminDashboard email={session.user.email}></AdminDashboard>}
    {!session && <div className={styles.container}>
      <Head>
        <title>Project Access Platform</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      <PaNavbar />

      <main className={styles.main}>
        <h1 className={styles.title}>Project Access Austria</h1>
      </main>

      <footer className={styles.footer}></footer>
    </div>}
    </>
  );
}
