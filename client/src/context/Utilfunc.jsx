import React, { useState } from 'react'
import { MyContext } from "./Mycontext";

export default function Utilfunc({children}) {
    const [reciverDetails, setReciverDetails] = useState("")
    const [isSeen,setIsSeen]=useState(false)
    const [messages, setMessages] = useState([])
    const currentUserData= JSON.parse(localStorage.getItem("currentUserData"))
    const [currentChat, setCurrentChat] = useState("")

    const introBgm= () => {
        let audio = new Audio("/sounds/Breaking Bad Intro.mp3")
        audio.play()
      }
      const [signup, setSignup] = useState(false)
      const logSignRenderer=()=>{
        !signup?setSignup(true):setSignup(false)
    }
    const CurrentReciverData=async(id)=>{
      const r=await fetch("http://localhost:3001/user/fetchSingleUsers",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            authorization: currentUserData.token
          },
          body:JSON.stringify({userId:id}),      
      })
      const res=await r.json();
      setReciverDetails(p=>p=res)
    }
    const getCurrentChat=async(data)=>{//todo
      const res=await fetch("http://localhost:3001/chat/getCurrentChat", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              authorization: currentUserData.token
          },
          body: JSON.stringify({ reciver: data })
      })
      const r=await res.json();
      setCurrentChat(r)
   }

  return (
    <MyContext.Provider value={{introBgm,signup,setSignup,logSignRenderer,reciverDetails,setReciverDetails,CurrentReciverData,currentChat,setCurrentChat,getCurrentChat,messages,setMessages,isSeen,setIsSeen}}>
      {children}
    </MyContext.Provider>
  )
}
