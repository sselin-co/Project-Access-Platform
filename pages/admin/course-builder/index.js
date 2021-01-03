import React from "react";
import styles from "../../../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import PaNavbarAdmin from "../../../components/pa-navbar-admin";
import CourseTable from "../../../components/course-table";

export default function CourseBuilder(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Course Builder</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      <PaNavbarAdmin email={props.email}></PaNavbarAdmin>

      <main className={styles.main}>
        <CourseTable />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
