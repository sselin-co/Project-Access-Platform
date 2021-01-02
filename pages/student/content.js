import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";


export default function Content(props) {
    
    return (
        <div className="col work-col">
            <div className="small-12 medium-5 medium-pull-7 columns">
                <div className="details details-ftm">
                    <h3 className="text-center">{props.title}</h3>

                    <p className="icons"><i className="fi-monitor"></i><i className="fi-tablet-portrait"></i><i class="fi-mobile"></i></p>
                    <p>{props.content}</p>
                </div>
            </div>
        </div>
    );
}
