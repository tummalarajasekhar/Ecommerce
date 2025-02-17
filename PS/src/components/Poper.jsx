import React, { useEffect ,useState} from 'react'
import '../index.css'

function Poper({popMessage,setPopMessage}) {
    useEffect(()=>{
        handlePoper()
    },[])
    let [bg,setbg]=useState('animate-fall-in')
    const handlePoper=()=>{
        setTimeout(()=>{
          setbg('animate-vanish-out')
          setTimeout(()=>{
            setPopMessage('')
          },1000)
        },4000)
    }
  return (
    <div className={` bg-green-500 shadow-green-500/25  flex items-center text-opacity-50 justify-center fixed top-6 right-6 min-w-[40%] h-20 p-2 rounded-lg  text-2xl font-bold z-200 shadow-2xl s transform ${bg} scale-70 duration-500`}>{popMessage}</div>
  )
}

export default Poper
