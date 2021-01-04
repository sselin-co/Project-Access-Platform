import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import PaNavbarAdmin from "../../../components/pa-navbar-admin.js";
import Footer from "../../general/footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import StudentAssignments from "../../../components/student-assignments";
import useSwr from "swr";
import Loading from "../../../components/loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function StudentAssignmentInfo() {
  const [session, loading] = useSession();
  if (loading) return null;
  return (
    <div className={styles.container}>
      <Head>
        <title>Assignment</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      <PaNavbarAdmin email={session.user.email} />

      <main className={styles.main}>
        <StudentAssignments></StudentAssignments>
      </main>
    </div>
  );
}
