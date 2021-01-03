import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import PaNavbarAdmin from "../../../components/pa-navbar-admin.js";
import CourseBuilderComponent from "../../../components/course-builder";

export default function CourseBuilderPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Course Builder</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      <PaNavbarAdmin />

      <main className={styles.main}>
        <CourseBuilderComponent></CourseBuilderComponent>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
