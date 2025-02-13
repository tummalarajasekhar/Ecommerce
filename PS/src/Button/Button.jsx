import React from 'react'

function Button({
    name,
    bgColor='bg-blue-200 text-[#8241B8] '
}) {
  return (
    <button className={`${bgColor} flex px-3 py-3  font-serif font-extrabold shadow-2xl rounded-2xl hover:bg-[#FBEE0F] hover:scale-110 transition ease-in-out duration-600 max-w-full `}>{name}</button>
  )
}

export default Button