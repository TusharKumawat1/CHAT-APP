import React from 'react'
import styles from "../styles/chtaHome.module.css"
import Typewriter from 'typewriter-effect';

export default function GreatingArea() {

    return (
        <div className={styles.homeContainer}>
            <h1><Typewriter
                options={{
                    strings: ['Hello', 'नमस्ते',"Guten Tag","Wellcome","स्वागत"],
                    autoStart: true,
                    loop: true,
                }}
            /></h1>
            <div className={styles.main}>
                <img src="/gifs/greatings/homeGreating.gif" alt="" />
            </div>

        </div>
    )
}
