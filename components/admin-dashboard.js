import Head from "next/head";
import styles from "../styles/Home.module.css";
import PaNavbarAdmin from "./pa-navbar-admin.js";
import Image from "next/image";
import Link from "next/link";
import AdminDashTable from "./admin-dash-table.js";

export default function AdminDashboard(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Admin Dashboard</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      {/* <PaNavbar /> */}
      <PaNavbarAdmin email={props.email}></PaNavbarAdmin>

      <main className={styles.main}>
        <AdminDashTable />
      </main>

      <Footer/>
    </div>
  );
}
