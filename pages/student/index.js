import Head from "next/head";
import styles from "../../styles/Home.module.css";
import PaNavbarStudent from "../../components/pa-navbar-student.js";

export default function StudentHome(props) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Project Access Platform</title>
                <link rel="icon" href="/logo_key_colour_highres.ico" />
            </Head>

            {/* <PaNavbar /> */}
            <PaNavbarStudent email={props.email}></PaNavbarStudent>

            <main className={styles.main}>
                <h1 className={styles.title}>Project Access Austria</h1>
            </main>

            <footer className={styles.footer}></footer>
        </div>
    );
}
