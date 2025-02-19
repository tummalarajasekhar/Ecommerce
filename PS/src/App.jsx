

import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import bg from './assets/bg1.jpg';
import Poper from './components/Poper';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [authOpen, setauthOpen] = useState(false)
  const [userExists, setUserExists] = useState(false)
  // const [pop,setPop]=useState(false)
  const [popMessage,setPopMessage]=useState('')
  const user = useSelector(state => state.auth.users)
  // console.log(user);
  
useEffect(()=>{
  if (user.length>0) setUserExists(true)
  },[user])
  

  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.src = bg;  // Replace with your background image URL
    img.onload = () => {
      setImageLoaded(true);  // Set state to true when the image has loaded
    };
  }, []);
  

  return (
    <>
    {popMessage && <Poper popMessage={popMessage} setPopMessage={setPopMessage}/>}

    <div className={imageLoaded ? "block" : "hidden"}>
    <Navbar authOpen={authOpen} setauthOpen={setauthOpen} userExists={userExists} setUserExists={setUserExists} setPopMessage={setPopMessage} />
    <Home authOpen={authOpen} setauthOpen={setauthOpen}  setPopMessage={setPopMessage}  />
    <Footer/>
    </div>
     
    </>
  )
}

export default App
