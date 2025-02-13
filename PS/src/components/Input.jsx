import React, { useState,useId ,forwardRef} from 'react'

const Input=forwardRef(function Input({
  type = "text",
  placeholder = 'enter here ',
  labelWidth='max-w-[20%]',
  ...props
},ref) {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState("")
  const inputId = useId()
  
  return <>

    <input
      type={`${type}`}
      id={inputId} 
      onChange={(e)=>setValue(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={()=>setIsFocused(value!=="")}
      
      {...props}
      ref={ref}
      className='bg-white rounded-lg p-2 text-lg  outline-none border-2 border-black' />
    <label htmlFor={inputId}  className={`cursor-text relative inline-flex ${labelWidth } bg-white transform -translate-y-11 ${isFocused ? "transform -translate-y-13.5 text-sm ml-2 pl-2 bg-transparent px-2 duration-500" : "m-2 "} `}> {placeholder} </label>
  </>
}
)
export default Input