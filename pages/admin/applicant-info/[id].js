import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import PaNavbarAdmin from "../../../components/pa-navbar-admin.js";
import DisplayApplicantInfo from "../../../components/applicant-info";
import Footer from "../../general/footer";
/* 
Shaya: 
  Because this page is accessed through a direct link, we cannot
  pass props into it like you would normally with a React component.
  I tried to get around this by directly importing the session, but 
  it's prone to breaking when this page is opened in a new tab.
  Perhaps store the admin name when a session is first created to a local
  global variable?

  Airtable throws a 404 when opening a student record in a new tab. It doesn't
  seem to effect functionality at all, it just crops up for some reason. 
*/
import { useSession } from "next-auth/client";

/*
ApplicationInfo: dynamically routed page for applicant information. 
*/
export default function ApplicantInfo() {
  const [session, loading] = useSession();
  if (loading) return null;
  return (
    <div className={styles.container}>
      <Head>
        <title>Student Info</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      <PaNavbarAdmin email={session.user.email} />

      <main className={styles.main}>
        <DisplayApplicantInfo></DisplayApplicantInfo>
      </main>

      <Footer />
    </div>
  );
}
