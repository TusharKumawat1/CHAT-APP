import React, { useEffect } from 'react'
import styles from "../styles/chatwindow.module.css"
import ConnectionArea from './ConnectionArea';
import UserChat from './UserChat';
import { useNavigate } from 'react-router-dom';
import GreatingArea from './GreatingArea';

export default function ChatWindow() {

  const navigate = useNavigate();
  const path = window.location.pathname == "/chats" || window.location.pathname == "/chats/";
  useEffect(() => {
    if (!localStorage.getItem("currentUserData")) {
      navigate("/")
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.connections}>
            <ConnectionArea />
      </div>
      {path ? <GreatingArea /> : <UserChat />}

    </div>
  )
}
