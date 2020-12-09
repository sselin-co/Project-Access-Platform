import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button, Dropdown } from 'react-bootstrap'
import PaNavbar from '../pages/pa-navbar.js';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Project Access Platform</title>
        <link rel="icon" href="/logo_key_colour_highres.ico" />
      </Head>
      
      <PaNavbar />

      <main className={styles.main}>   
        <h1 className={styles.title}>
          Project Access Austria
        </h1>
        
      </main>

      <footer className={styles.footer}>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a> */}
      </footer>
    </div>
  )
}
