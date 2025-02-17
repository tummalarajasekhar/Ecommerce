import React, { useState,useId ,forwardRef} from 'react'

const Input=forwardRef(function Input({
  type = "text",
  placeholder = 'enter here ',
  labelWidth='max-w-[20%]',
  Width,
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
      onBlur={()=>setIsFocused(value.length>0)}
    
      
      {...props}
      ref={ref}
      className={`bg-white rounded-lg p-2 h-20 text-4xl  outline-none border-2 border-black lg:h-15 lg:text-2xl ${Width}`} />
    <label htmlFor={inputId}  className={` cursor-text relative inline-flex  ${labelWidth } bg-white transform -translate-y-17 lg:-translate-y-13  ${isFocused ? "transform -translate-y-24.5 lg:-translate-y-18 lg:text-md text-lg ml-2 pl-2 bg-transparent px-2 duration-500" : " mt-2 ml-2"} `}> {placeholder} </label>
  </>
}
)
export default Input