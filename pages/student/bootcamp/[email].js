import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from 'next/image';
import styles from "../../../styles/Home.module.css";
import PaNavbarStudent from "../../../components/pa-navbar-student.js";
import Footer from "../../general/footer";
import Content from "../content";


export default function Bootcamp() {
    const router = useRouter();
    const studentEmail = router.query.email;
    //const { data, error } = useSwr(`/api/applicant-info/${studentEmail}`, fetcher);
    // if (error) return <div>Failed to load applicant information</div>;
    // if (!data) return <Loading />;
    //console.log(router.query);

    return (
        <div className={styles.container}>
            <Head>
                <title>Project Access Platform</title>
                <link rel="icon" href="/logo_key_colour_highres.ico" />
            </Head>

            {/* <PaNavbar /> */}
            <PaNavbarStudent email={studentEmail}></PaNavbarStudent>

            <main className={styles.main}>
                <section id="experience">

                    <div className="row column">
                        <div className="small-12">
                            <h3 className={styles.title}>Program</h3>
                            <h4 className="text-center tag-line">This is what awaits you at the boot camp</h4>
                            <p className="text-center tag-line">The exact program varies for each participant, depending on which seminar group you are in and which universities you will be applying to.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 medium-4 columns text-center experience-topics">
                            <i className="fi-laptop"></i>
                            <h3>Thursday</h3>
                            <ul>
                                <li>getting there</li>
                            </ul>
                        </div>
                        <div className="small-12 medium-4 columns text-center experience-topics">
                            <i className="fi-database"></i>
                            <h3>Friday</h3>
                            <ul>
                                <li>Get to know the other participants</li>
                                <li>Mock exams</li>
                                <li>First overview: what is a good application?</li>
                                <li>Skills workshops and presentations by the sponsors</li>
                                
                                
					        </ul>
                            <p>Evening Event</p>
                        </div>
                        <div className="small-12 medium-4 columns text-center experience-topics">
                            <i className="fi-star"></i>
                            <h3>Saturday</h3>
                            <p>Various seminar contents:</p>
                            <ul>
                                
                                <li>Interviews</li>
                                <li>Aptitude Exams</li>
                                <li>Personal statement writing</li>
                                <li>Essay writing</li>
                                <li>Research Statement</li>
                                <li>Statement of Interest</li>
                                <li>Letters of Reference</li>
                                
                            </ul>
                            <p>Evening Event</p>
                        </div>
                        <div className="small-12 medium-4 columns text-center experience-topics">
                            <i className="fi-star"></i>
                            <h3>Sunday</h3>
                            <ul>
                                <li>further seminar contents</li>
                                <li>Transfer exercises</li>
                                <li>Farewell and journey home</li>
                            </ul>
                        </div>
                    </div>

                </section>
                <h3 className={styles.title}>Bootcamp FAQs</h3>
                <Content title="What is the boot camp?" content="The Bootcamp is a three-day seminar that is held every summer for all Project Access Austria Mentees. In the seminar you can acquire important skills for applying to our target universities."></Content>
                <Content title="Who can take part in the bootcamp?" content="The Bootcamp is a three-day seminar that is held every summer for all Project Access Austria Mentees. In the seminar you can acquire important skills for applying to our target universities."></Content>
                <Content title="How can I participate in the boot camp?" content="To participate in the boot camp, simply register for our program using this form . In the first step we only need your first name and your email address. One of our team members will then contact you to find out how exactly we can help you."></Content>
                <Content title="Does participation in the boot camp cost anything?" content="Participation in the boot camp is free. However, you usually have to pay the travel costs yourself. Contact one of our team members if you cannot cover the travel costs yourself. It is important to us to help you! This is possible thanks to the voluntary work of numerous Project Access team members, mentors and thanks to our sponsors."></Content>
                <Content title="Do I have to attend the boot camp?" content="If you are accepted into the Project Access Austria program, i.e. if you receive a mentor from us and gain access to the online course, we expect that you will also take part in the bootcamp. This applies to both applicants for bachelor's programs and those for master’s programs."></Content>
                <Content title="When should I apply for the boot camp?" content="We only have a limited number of places available for the boot camp (and thus for our program). So you better apply as soon as possible - as soon as the places are taken, we will no longer accept new applications. You can apply now - in the first step we only need your first name and your email address, which you can give us in the form on the homepage of this website. We will then contact you with further information."></Content>
                <Content title="When does the boot camp take place?" content="The next boot camp will take place in summer 2021. More detailed information will follow."></Content>
                <Content title="How will the boot camp work?" content="You will be prepared for applications to top international universities with a range of different activities. Most of the content and activities will take place together with your seminar group, a group of 8-12 bootcamp participants. Each seminar group is led by 2-3 trainers. All trainers have studied at one of our target universities themselves. In addition to the activities in the seminar group, there are also other items on the program, such as 'Mock Exams', i.e. trial entrance exams. For some participants we can also organize trial interviews with real admissions officers."></Content>

            </main>

            <Footer />
        </div>


    );
}
