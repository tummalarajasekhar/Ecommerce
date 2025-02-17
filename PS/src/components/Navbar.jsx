import React, { useState, useRef, useEffect } from 'react';
import Content from './Content';
import { Link } from 'react-router-dom'
import Button from '../Button/Button';
import Auth from './Auth';

import { logout,setUser } from '../createSlice/authSlice';
import { removeCart } from '../createSlice/productSlice';
import { useDispatch } from 'react-redux';
import { getUserFromToken } from '../decode/accessToken';




function Navbar({authOpen,setauthOpen,userExists,setUserExists,setPopMessage}) {
  const dispatch=useDispatch()
  const [isOpen, setIsOpen] = useState(false); // State to toggle the menu
  
  
  // const user = useSelector(state => state.auth.users)
  // console.log(user);
  
// useEffect(()=>{
//   if (user.length>0) setUserExists(true)
//   },[user])
  
  

  const evaluatetoken=()=>{
    const user=getUserFromToken()
    if (user){
      setUserExists(true)
      setPopMessage('Welcome Back !!')
      dispatch(setUser(JSON.parse(localStorage.getItem('token'))))
      
    }
    else{
      localStorage.clear()
    }
  }
  useEffect(()=>{evaluatetoken()},[])



  const menuRef = useRef()
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false); // Close the menu
    }
  };
  useEffect(() => {
    // Add a click event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Lock scroll
    } else {
      document.body.style.overflow = ""; // Unlock scroll
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isOpen]);
 
  const handleLogout = () => {
    dispatch(logout())
    setPopMessage(' Logged Out !!')
    dispatch(removeCart())
    setUserExists(e=>!e)
    

  }

  return (
    <>
      {authOpen && <Auth setAuthOpen={setauthOpen} setUserExists={setUserExists} setPopMessage={setPopMessage}/>}

      <div
        className="h-auto bg-gradient-to-r from-[#8241B8]  to-[#6C33A3] "

      >
{/* TODO: */}

{/* {pop &&< Poper children={'signup'} setPop={setPop}/>} */}



        {/* Company Section */}
        <div className="  text-center flex justify-center items-center  font-extrabold text-transparent  bg-clip-text bg-[#FBB80F]   pt-4 goblin relative ">
          <ul className="flex justify-evenly   mx-[15%]">
            <li className="pressstart  unlist ">Home</li>
            <li className="pressstart unlist ">About</li>
            <li className=' text-5xl  w-full max-w-lg mx-auto  ' >COMPANY</li>
            <li className="pressstart unlist ">Products</li>
            <li className="pressstart unlist ">Contact</li>
          </ul>


          {/* Hamburger Button */}
          <button
            className="absolute right-5 top-5 text-[4rem] text-[#FFC107] hover:text-white lg:hidden"
            onClick={() => setIsOpen(true)} // Open the menu
          >
            ☰
          </button>
        </div>


        {/* sign up  */}

        {userExists ?
          (<div className='sm:hidden lg:block fixed top- right-4 z-100' onClick={handleLogout} >
            <Button name={"Logout"} />
          </div>) :
          (<div className='sm:hidden lg:block fixed top- right-4 z-100' onClick={() => setauthOpen(!authOpen)}>
            <Button name={"SignUp"} />
          </div>)
        }

        {/* Sliding Menu */}
        <div
          ref={menuRef}
          className={`z-500 fixed top-0 left-0 h-full w-[80%]   bg-white transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="p-12 text-blue-500">
            <h2 className="font-bold text-4xl mb-4">Menu Content</h2>
            <ul>
              <li className=" menulist">Home</li>
              <li className=" menulist">About</li>
              <li className=" menulist">Products</li>
              <li className=" menulist">Contact</li>
            </ul>
          </div>
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setIsOpen(false)} // Close the menu
          >
            ✖
          </button>
        </div>
        <Content />

      </div>
    </>
  );
}

export default Navbar;
