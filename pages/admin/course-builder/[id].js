import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import PaNavbarAdmin from "../../../components/pa-navbar-admin.js";
import CourseBuilderComponent from "../../../components/course-builder";
import { useSession } from "next-auth/client";
import Loading from "../../../components/loading";

export default function CourseBuilderPage() {
  const [session, loading] = useSession();
  if (loading) return <Loading />;
  return (
    <div className={styles.container}>
      <Head>
        <title>Course Builder</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      <PaNavbarAdmin email={session.user.email} />

      <main className={styles.main}>
        <CourseBuilderComponent></CourseBuilderComponent>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
