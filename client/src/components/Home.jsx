import React, { useContext, useEffect} from 'react'
import styles from "../styles/homePage.module.css"
import Typewriter from 'typewriter-effect';
import DIALOGUES from '../constants/dialogues';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { MyContext } from '../context/Mycontext';
import { useNavigate } from 'react-router-dom';

export default function Home({ introMusic }) {
  const {signup}=useContext(MyContext);
  const navigate=useNavigate();
  useEffect(() => {
    if (localStorage.getItem("currentUserData")) {
      navigate("/chats")
    }
  }, [])
  
  return (
    <div className={styles.container}>

      <div className={styles.Aside}>

        <h1 className={styles.dialogues}><Typewriter
          options={{
            strings: DIALOGUES,
            autoStart: true,
            loop: true,
            deleteSpeed: 10,
            delay: -0.5,
            pauseFor: 2000,
          }}
        /></h1>
        <div className={styles.gifs}>
          <div><img src="/gifs/walter.gif" alt="" /></div>
        </div>
      </div>
          {signup?<SignupForm/>:<LoginForm/>}
    </div>
  
  )
}
