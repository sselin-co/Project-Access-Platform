import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import PaNavbarStudent from "../../components/pa-navbar-student.js";
import Footer from "../general/footer";
import HomeCarousel from "../../components/home-carousel";

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
        {/* <h1 className={styles.title}>Project Access Austria</h1> */}
        <HomeCarousel />
      </main>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/wQf4C9AL1k0"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div className="col work-col">
        <div className="small-12 medium-5 medium-pull-7 columns">
          <div className="details details-ftm">
            <h3 className="text-center">
              Press article about Project Access Austria
            </h3>
            <a href="https://m.noen.at/baden/auslandsstudium-von-baden-in-die-weite-welt-baden-auslandsstudium-217784883">
              From Baden to the big wide world - NÖN.at
            </a>
            <br />
            <a href="https://m.noen.at/moedling/moedling-neue-herausforderung-unistudium-im-ausland-moedling-auslandsstudium-studium-217793508">
              New challenge: University studies abroad - NÖN.at
            </a>
            <br />
            <a href="https://www.diepresse.com/5494575/oxford-cambridge-und-co-top-unis-fur-alle#">
              Oxford, Cambridge and Co. - Top universities for everyone -
              DiePresse
            </a>
            <br />
            <a href="https://www.meinbezirk.at/klosterneuburg/c-lokales/brg-maturantin-auf-bestem-weg-nach-grossbritannien_a2915174">
              BRG high school graduate on the best way to Great Britain - my
              district.at
            </a>
            <br />
            <a href="https://www.pressreader.com/austria/der-standard/20190720/282011853953461">
              Preparation for studying at a top university - the standard
            </a>
            <br />
            <a href="https://kurier.at/kiku/trotz-corona-covid19-und-brexit-wie-gehts-hier-zu-oxbridge/400849982">
              How's it going to Oxbridge? - courier
            </a>
            <br />
            <a href="https://weltweitestars.com/lifestyle/so-klappts-mit-dem-studium-im-ausland/">
              This is how it works with studying abroad - WorldwideSTARS
            </a>
            <br />
            <a href="https://www.lsr-ooe.gv.at/fileadmin/erlasssammlung/2018/B9-21-4-18.pdf">
              State School Board
            </a>
            <br />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
