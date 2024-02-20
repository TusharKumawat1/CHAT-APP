import React, { useContext } from 'react'
import styles from "../styles/loginform.module.css"
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { MyContext } from '../context/Mycontext';
import 'react-toastify/dist/ReactToastify.css';
export default function SignupForm() {
    const {introBgm,logSignRenderer} = useContext(MyContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data, e) => {
        e.preventDefault();

        toast.promise(
            new Promise(async (resolve, reject) => {
                const res = await fetch("https://chatapp-afbn.onrender.com/auth/signup", {
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
            <h1 className={styles.loginHeadline}>Hello Community 👋</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={styles.heading}> <span className={styles.logo}>Br</span>eaking <span className={styles.logo}>Ch</span>at</h1>
                <div className={styles.inputContainer}>

                    <input type="text" placeholder='Say your name' name='username' id='username' className={styles.userInput} {...register("username", { required: true })} />
                    <img src="/img/hisenberg.png" width={25} height={25} alt=""  className={styles.hisenberg}/>
                    <label className={styles.user} htmlFor='username' >  Say your name...</label>
                </div>
                <div className={styles.inputContainer}>

                    <input minLength={8} type="email" placeholder='@email.com' name='email' className={styles.userInput} {...register("email", { required: true, minLength: 8 })} />
                   <div className={styles.icon}> <i className="fa-regular fa-envelope" ></i></div>
                    <label className={styles.user} htmlFor='username' >  @email.com </label>
                </div>
                <div className={styles.inputContainer}>

                    <input minLength={8} type="password" placeholder='*******' name='username' className={styles.userInput} {...register("password", { required: true, minLength: 8 })} />
                    <div className={styles.icon}> <i className="fa-solid fa-lock"></i></div>
                    <label className={styles.user} htmlFor='username' >  ******* </label>
                </div>

                <button type="submit"  >Start now</button>
            </form>
            <div className={styles.footer}>
                <span className={styles.signupBtn} onClick={logSignRenderer}>Login?</span>
                <h1 className={styles.slogan}>Chat , Meme , Breaking Bad!</h1>
            </div>
        </div>
    )
}
