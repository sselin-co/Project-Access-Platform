import React, { useEffect } from "react";
import styles from "../../../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import PaNavbar from "../../../components/pa-navbar";
import PaNavbarAdmin from "../../../components/pa-navbar-admin";
import CourseTable from "../../../components/course-table";
import { useSession } from "next-auth/client";
import { Redirect } from "react-router-dom";
import { useRouter } from "next/router";

export default function CourseBuilder(props) {
  const [session, loading] = useSession();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Course Builder</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>
      {session && session.user.name == "admin" && (
        <>
          <PaNavbarAdmin email={session.user.email}></PaNavbarAdmin>

          <main className={styles.main}>
            <CourseTable />
          </main>
        </>
      )}
      {/* {!session &&
        useEffect(() => {
          router.push("/");
        })} */}

      <footer className={styles.footer}></footer>
    </div>
  );
}
