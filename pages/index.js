import Head from "next/head";
import styles from "../styles/Home.module.css";
import PaNavbar from "../components/pa-navbar.js";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Project Access Platform</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      <PaNavbar />

      <main className={styles.main}>
        <h1 className={styles.title}>Project Access Austria</h1>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
