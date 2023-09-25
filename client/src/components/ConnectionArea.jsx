import React, { useContext, useEffect, useState } from 'react';
import Styles from "../styles/conn.module.css";
import { Link, useNavigate, useParams } from "react-router-dom"
import { MyContext } from '../context/Mycontext';
export default function ConnectionArea() {
  const ID=useParams();
  const {  getCurrentChat ,messages} = useContext(MyContext);
  const [searchText, setSearchText] = useState("")
  const [users, setusers] = useState()
  const currentUserData = JSON.parse(localStorage.getItem("currentUserData"))
  const navigate = useNavigate();
  const redirect = async (data) => {

    //featching reciver details
    getCurrentChat(data._id).then(()=>navigate(`/chats/${data._id}`));
    
  }


  //fetching available users via query
  const handlechange = async (e) => {
    setSearchText(pre => pre = e.target.value)
    const result = await fetch(`http://localhost:3001/user/searchUser?search=${searchText}`, {
      method: "GET",
      headers: {
        authorization: currentUserData.token
      }
    });
    const jsonRes = await result.json();
    setusers(p => p = jsonRes)
  }


  //fetching available users
  const fetchUsers = async () => {
    const r = await fetch("http://localhost:3001/user/fetchUsers", {
      method: "GET",
      headers: {
        authorization: currentUserData.token
      }
    });
    const res = await r.json();
    setusers(pre => pre = res)
  }

  //Display users after fecthin them in connection area
  useEffect(() => {
    fetchUsers();
  }, [])
  useEffect(() => {
    fetchUsers();
  }, [messages])

  //loging out current user
  const logOut = () => {
    localStorage.removeItem("currentUserData")
    navigate("/")
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h2>Connections</h2>
        <div className={Styles.plusIcon}><i className="fa-solid fa-plus"></i></div>
      </div>
      <div className={Styles.searchBar}>
        <label htmlFor="searchText"> <i className="fa-solid fa-magnifying-glass"></i></label>
        <input type="text" name='searchText' id="searchText" placeholder='Find people or groups' value={searchText} onChange={handlechange} />
      </div>
      <div className={Styles.friends}>
        {users?.map((data) => {
          return <div key={data._id} className={Styles.friendChat} onClick={() => redirect(data)}style={ID.userId===data._id?{backgroundColor:"#ccf896"}:{}}>
            <div className={Styles.pfp}>
              <img src={data.pfp} alt="friend" width={80} height={70} />
            </div>
            <div className={Styles.id}>
              <h3>{data.username} 
              <span className={Styles.newMessage}>+1</span>
              </h3>
              <div className={Styles.idStatus}>
                <p>{data.latestMessage.latestMsg}</p>
                <span>{data.latestMessage.timeStamp}</span>
              </div>
            </div>
          </div>
        })}
      </div>
      <div className={Styles.gif}>
        <div className={Styles.links}>
          <Link>About</Link>
          <Link>Contact</Link>
          <Link>About App</Link>
          <Link>Links</Link>
        </div>
        <div className={Styles.btns}>
          <button className={Styles.settingBtn}>Settings</button>
          <button className={Styles.logoutBtn} onClick={logOut}>Logout</button>
        </div>
      </div>
    </div>
  )
}
