import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faFacebook,
    faInstagram,
    faTwitter,
    faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
library.add(
    faLinkedin,
    faFacebook,
    faInstagram,
    faTwitter,
    faYoutube,
    faEnvelope
);
import styles from "../../styles/Home.module.css";


export default function Footer() {

    return (
        <footer className={styles.footer}>
            <div >
                <div className="row text-center">
                    <div className="col-md-2"><a target="_blank" href="https://www.facebook.com/projectaccessaustria"><FontAwesomeIcon style={{ width: '40px' }} icon={faFacebook} /></a></div>
                    <div className="col-md-2"><a target="_blank" href="https://www.linkedin.com/company/projectaccess/"><FontAwesomeIcon style={{ width: '40px' }} icon={faLinkedin} /></a></div>
                    <div className="col-md-2"><a target="_blank" href="https://www.youtube.com/channel/UCgyGgt6l17sLAvXTFoaQOdA"><FontAwesomeIcon style={{ width: '40px' }} icon={faYoutube} /></a></div>
                    <div className="col-md-2"><a target="_blank" href="https://twitter.com/projectaccess_"><FontAwesomeIcon style={{ width: '40px' }} icon={faTwitter} /></a></div>
                    <div className="col-md-2"><a target="_blank" href="https://www.instagram.com/projectaccess.at/"><FontAwesomeIcon style={{ width: '40px' }} icon={faInstagram} /></a></div>
                    <div className="col-md-2"><a target="_blank" href="mailto:hi@projectaccess.at"><FontAwesomeIcon style={{ width: '40px' }} icon={faEnvelope} /></a></div>
                </div>
                <p id="copyright">&copy; 2020 | Project Access Austria</p>

            </div>
        </footer>
        
    );
}
