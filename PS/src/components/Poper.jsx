import React, { useEffect } from 'react'

function Poper({children,setPop}) {
    useEffect(()=>{
        handlePoper()
    })
    const handlePoper=()=>{
        setTimeout(()=>{
            setPop(e=>!e)
        },5000)
    }
  return (
    <div className='bg-green-500 shadow-green-500/25 fixed top-6 right-6 w-[200px] p-2 rounded-lg  text-2xl font-bold z-50 transform scale-70'>{children}</div>
  )
}

export default Poper
