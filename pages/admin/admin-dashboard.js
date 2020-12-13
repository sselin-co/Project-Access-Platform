import Head from "next/head";
import styles from "../../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Dropdown,
  Col,
  Row,
  Table,
} from "react-bootstrap";
import PaNavbarAdmin from "../../components/pa-navbar-admin.js";
import Image from "next/image";
import Link from "next/link";
import AdminDashTable from "../../components/admin-dash-table.js";

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Admin Dashboard</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>

      <PaNavbarAdmin />

      <main className={styles.main}>
        <AdminDashTable />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
