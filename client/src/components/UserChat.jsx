import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import EmojiPicker from 'emoji-picker-react';
import ClickAwayListener from 'react-click-away-listener';
import styles from "../styles/userChat.module.css";
import { MyContext } from '../context/Mycontext';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import socket from "../socket"
export default function UserChat() {
    const ID = useParams();
    const chat = useRef();
    const { reciverDetails, CurrentReciverData, currentChat, messages, setMessages, isSeen, setIsSeen } = useContext(MyContext);
    const [msg, setMsg] = useState("")
    const [emojiPicker, setEmojiPicker] = useState(false)
    const [showGreatings, setShowGreatings] = useState(true)
    const [typing, setTyping] = useState(false);
    const [loading, setLoading] = useState(false);
    const [randomPath, setRandomPath] = useState("/gifs/greatings/emoji1.gif")
    const emojiPaths = ["/gifs/greatings/emoji1.gif", "/gifs/greatings/emoji2.gif", "/gifs/greatings/emoji3.gif", "/gifs/greatings/emoji4.gif", "/gifs/greatings/emoji5.gif",]

    //geting current user data via localStorage
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"))

    //geating random path
    function get_random(list) {
        return list[Math.floor((Math.random() * list.length))];
    }

    //Debouncing....
    useEffect(() => {
        const myInterval = setInterval(() => {
            setRandomPath(get_random(emojiPaths))
        }, 4000)
        return () => {
            clearInterval(myInterval);
        }
    }, [randomPath])

    //isTyping debouncing...
    useEffect(() => {
        const myInterval = setInterval(() => {
            setTyping(false)
        }, 3000)
        return () => {
            clearInterval(myInterval);
        }
    }, [typing])

    //emoji picker
    const pickEmoji = () => {
        setEmojiPicker(!emojiPicker)
    }
    const fileChange = () => {
        if (e.target.files) {
            setFile(e.target.files);
        }
    }
    //Extracting emoji and tadding it to text input
    const addEmoji = (data) => {
        setMsg((pre) => pre + data.emoji)
    }
    //form hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //handling change
    const handleChange = (e) => {
        setMsg(e.target.value)
        socket.emit("isTyping", currentChat._id);

    }


    //sending user messages to backend 
    const addMessage = async () => {
        const res = await fetch("http://localhost:3001/chat/addMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: currentUserData.token
            },
            body: JSON.stringify({ reciver: ID.userId, data: msg })
        })
        const r = await res.json()
    }

    //fetch all messages between users
    const getMessages = async () => {

        const response = await fetch("http://localhost:3001/chat/getMessages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: currentUserData.token
            },
            body: JSON.stringify({ reciver: ID.userId })
        })
        let r = await response.json()

        if (r.status) {
            setMessages(p => r.messages)
            setLoading(false)
            return r.messages
        }

    }


    const onsubmit = async (data, e) => {

        e.preventDefault();

        //adding messages to database and refeacthing them
        addMessage().then(() => getMessages()).then(() => {
            sendMessage();
        })

        //clearing input feald
        setMsg(p => p = "");
    }

    const sendMessage = async () => {

        socket.emit("stop typing", currentChat._id);
        socket.emit("sendMessages");

    }
    //Featching chat messages at the time of reandring
    useEffect(() => {

        getMessages().then((messages) => {
            if (messages.length > 0) {
                setShowGreatings(false);
            } else {
                setShowGreatings(true);
            }
            //reciver seen messages
            setIsSeen(p => true)
        });

    }, [])
    //geating recivers detail
    useEffect(() => {
        CurrentReciverData(ID.userId);
        getMessages().then((messages) => {
            if (messages.length > 0) {
                setShowGreatings(false);
            } else {
                setShowGreatings(true);
            }
        });
        socket.emit("join-room", currentChat._id)
        setLoading(true)
    }, [ID.userId])

    //socket io 
    useEffect(() => {

        socket.emit("join-room", currentChat._id)
        socket.on("getMessages", () => {
            getMessages();
        });
        socket.on("typing_message", () => {
            setTyping(p => true)
        });
        socket.on("stop typing", () => setTyping(false));
    }, []);


    //handling scroll
    useEffect(() => {
        chat.current ? chat.current.scrollTop = chat.current?.scrollHeight : null
    }, [messages, typing])



    //main component
    return (
        <div className={styles.chatArea}>
            <div className={styles.header}>
                <div className={styles.infoContainer}>
                    <div className={styles.imgContainer}>
                        <img src="https://i.pinimg.com/originals/7e/40/9f/7e409f4d996cb2f3e1830ba24852673c.gif" alt="img" width={50} height={40} />
                    </div>
                    <h2>{reciverDetails.username} </h2>
                </div>
                <div className={styles.functionalities}>
                    <i className="fa-solid fa-phone"></i>
                    <i className="fa-solid fa-video"></i>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>

            {showGreatings ? <div className={styles.greatingArea}>
                <img src={randomPath} alt="hellow..." width={300} height={300} />
                <p>No messages yet!</p>
            </div> : <div className={styles.chat} >
                <div className={styles.msg} ref={chat} >
                    {loading && <Loader />}
                    {messages && messages.map((data, i) => {
                        if (data.sender !== ID.userId) {
                            return <div key={i} className={styles.rightChat}>
                                <div className={styles.messageOrange}>
                                    <p className={styles.messageContent}>{data.textMessage}</p>
                                    <div className={styles.messageTimestampRight}>{new Date(data.timeStamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                                </div>
                            </div>
                        } else {
                            return <div key={i} className={styles.leftChat}><div className={styles.messageBlue}>
                                <p className={styles.messageContent}>{data.textMessage}</p>
                                <div className={styles.messageTimestampLeft}>{new Date(data.timeStamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                            </div>  </div>
                        }
                    }

                    )}
                    {typing && <div className={styles.typing}>
                        <div className={styles.spinner}>
                            <div className={styles.bounce1}></div>
                            <div className={styles.bounce2}></div>
                            <div className={styles.bounce3}></div>
                        </div>
                    </div>}
                    {<p className={styles.seen}>seen <i class="fa-regular fa-eye"></i></p>}
                </div>

            </div>}


            <form onSubmit={handleSubmit(onsubmit)}>
                {emojiPicker && <ClickAwayListener onClickAway={pickEmoji}>
                    <div className={styles.emojiContainer}><EmojiPicker onEmojiClick={addEmoji} /></div>
                </ClickAwayListener>}
                <div className={styles.msgField}>
                    <div className={styles.emoji} onClick={pickEmoji}>
                        <i className="fa-regular fa-face-smile"></i></div>
                    <div >

                        <label htmlFor="file" className={styles.emoji}> <i className="fa-solid fa-paperclip" onChange={fileChange}></i></label>
                        <input type="file" id='file' />
                    </div>
                    <input className={styles.msgInput} type="text" placeholder='Message...' name='msg' {...register('text', { required: true })} value={msg} onChange={handleChange} />
                    <button type='submit' className={styles.sendBtn} ><i className="fa-solid fa-circle-arrow-right" style={{ color: "#3d9bff" }}></i></button>
                </div>
            </form>
        </div>
    )
}
