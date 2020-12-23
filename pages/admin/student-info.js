import Head from "next/head";
import styles from "../../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PaNavbarAdmin from "../../components/pa-navbar-admin.js";

export default function StudentInfo() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Student Info</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      <PaNavbarAdmin />

      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
