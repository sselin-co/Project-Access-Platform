import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../../../styles/Home.module.css";
//import PaNavbarStudent from "../../../components/pa-navbar-student.js";
import CourseViewComponent from "../../../../components/course-view";
import PaNavbarStudent from "../../../../components/pa-navbar-student";

export default function CourseViewPage() {
    const router = useRouter();
    const studentEmail = router.query.sid;

    //console.log(studentEmail);

    return (
        <div className={styles.container}>
            <Head>
                <title>Course Builder</title>
                <link rel="icon" href="/logo_key_colour_highres.ico" />
            </Head>

            <PaNavbarStudent email={studentEmail}/>

            <main className={styles.main}>
                <CourseViewComponent email={studentEmail}></CourseViewComponent>
            </main>

            <footer className={styles.footer}></footer>
        </div>
    );
}
