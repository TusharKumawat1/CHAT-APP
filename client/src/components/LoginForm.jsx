import React, { useContext } from 'react'
import styles from "../styles/loginform.module.css"
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '../context/Mycontext';
export default function LoginForm() {
    const {introBgm,logSignRenderer,setCurrentUserDetails} = useContext(MyContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data, e) => {
        e.preventDefault();

        toast.promise(
            new Promise(async (resolve, reject) => {
                const res = await fetch("http://localhost:3001/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                const r = await res.json()

                if (r.success) {
                    introBgm();
                    localStorage.setItem("currentUserData",JSON.stringify(r) )
                    navigate("/chats")
                    resolve("Welcome 👋")
                } else {
                    reject(r.error)
                }
            }),
            {
                pending: {
                    render() {
                        return "Fetching.."
                    },
                    icon: false,
                },
                success: {
                    render({ data }) {
                        return `Welcome 👋`
                    },
                    icon: "🟢",
                },
                error: {
                    render({ data }) {
                        return data
                    }
                }
            }
        )
    }

    return (
        <div className={styles.loginSection}>
            <h1 className={styles.loginHeadline}>Whatsapp Baeyatch?</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={styles.heading}> <span className={styles.logo}>Br</span>eaking <span className={styles.logo}>Ch</span>at</h1>
                <div className={styles.inputContainer}>

                    <input type="text" placeholder='Say your name' name='username' id='username' className={styles.userInput} {...register("username", { required: true })} />
                    <img src="/img/hisenberg.png" width={25} height={25} alt="" className={styles.hisenberg} />
                    <label className={styles.user} htmlFor='username' >  Say your name...</label>
                </div>
                <div className={styles.inputContainer}>

                    <input minLength={8} type="password" placeholder='*******' name='username' className={styles.userInput} {...register("password", { required: true, minLength: 8 })} />
                    <div className={styles.icon}> <i className="fa-solid fa-lock"></i></div>
                    <label className={styles.user} htmlFor='username' >  ******* </label>
                </div>

                <button type="submit"  >Start now</button>
            </form>
            <div className={styles.footer}>
                <span className={styles.signupBtn} onClick={logSignRenderer} style={{textAlign:"center"}}>Signup?</span>
                <h1 className={styles.slogan}>Chat , Meme , Breaking Bad!</h1>
            </div>
        </div>
    )
}