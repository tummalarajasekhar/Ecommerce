import React, { useState,useEffect } from 'react'
import Input from './Input.jsx'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { signup, login } from '../createSlice/authSlice.js'
import { fetchCartItems } from '../createSlice/productSlice.js'


function Auth({ setAuthOpen ,setUserExists}) {
  const dispatch = useDispatch()
  const [authState, setAuthState] = useState(true)
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm()
  const [loader, setLoader] = useState(false)
  const user = useSelector(state => state.auth)
  const [authSuccess,setAuthSuccess]=useState(false)
  const errorfromdatabase =user?.error 
  
  
  
  useEffect(()=>{
    
    if (user.users.length!=0){
      
      setUserExists(e=>!e)
        setAuthOpen(e=>!e)
        const token = JSON.parse(localStorage.getItem('token'))
       if (token)
            dispatch(fetchCartItems(token.token))
    }
    setError(errorfromdatabase)
  },[user])

  
  const handleAuth = async (data) => {

    if (authState) {
      if (data.password.length < 8) {
        setError('Your password length must be atleast 8')
      }
      else if (!/[a-zA-Z]/.test(data.password)) {
        setError('There must be atleast one Alphabet')

      } else if (!/\d/.test(data.password)) {
        setError('There must be atleast one digit in your password')

      } else if (!/[^a-zA-Z0-9]/.test(data.password)) {
        setError('There must be atleast one special characters in your password')

      } else {

        dispatch(login({ email: data.email, password: data.password }))
        
        




      }




    }
    else {
      if (data.password.length < 8) {
        setError('Your password length must be atleast 8')
      }
      else if (!/[a-zA-Z]/.test(data.password)) {
        setError('There must be atleast one Alphabet')

      } else if (!/\d/.test(data.password)) {
        setError('There must be atleast one digit in your password')

      } else if (!/[^a-zA-Z0-9]/.test(data.password)) {
        setError('There must be atleast one special characters in your password')

      } else if (data.password !== data.secondPassword) {
        setError('Password Should be same ')
      }
      else {

         dispatch(signup({ name: data.name, email: data.email, password: data.password }))
         
       
       

      }

    }



  }

  return (
    <>


      <div className='fixed  backdrop-blur-sm w-full h-full z-40 flex justify-center items-center '>
        <div className={`bg-white w-[80%] h-[80%] shadow-xl rounded-lg ${loader ? "" : 'overflow-auto'}`}>
          {loader &&
            !authSuccess && <div className='flex justify-center items-center w-full h-full transform animate-spin overflow-x-hidden  '>
              <div className=' border-4 border-black transform animate-pulse' viewBox="0 0 24 24"></div>
              <div className=' border-4 border-black w-4 h-4 transform animate-pulse'></div>
              <div className=' border-4 border-black w-4 h-4 transform animate-pulse'></div>
              <div className=' border-4 border-black  transform animate-pulse'>
              </div>
            </div>}
          {!loader && <div>
            <div className='flex justify-end'>
              <p className='  w-14   text-red-700  p-2 m-4 cursor-pointer ' onClick={() => setAuthOpen((e) => !e)}>close</p>
            </div>

            <div className='text-center font-bold text-4xl'>{authState ? "Log In" : "Sign Up"}</div>
            {authState && <div className='flex justify-center items-center bold text-xl' onClick={() => setAuthState(!authState)}> Don't have a account ? <p className='pl-4 text-blue-700 cursor-pointer'>SignUp </p></div>}
            {!authState && <div className='flex justify-center items-center bold text-xl' onClick={() => setAuthState(!authState)}>have a account ? <p className='pl-4 text-blue-700 cursor-pointer'>LogIn</p></div>}
            {error && <div className='text-red-600 text-lg font-bold mt-4 text-center'>{error}</div>}
            <form onSubmit={handleSubmit(handleAuth)}>
              <div className='flex flex-col mx-[20%] mt-[5%]   '>
                {!authState && <Input
                  type='text'
                  placeholder={"Name"}
                  {...register("name")}
                  labelWidth='max-w-[60px]'

                />}
                <Input
                  type='email'
                  placeholder={"Email"}
                  {...register("email")}
                  labelWidth='max-w-[60px]'

                />
                <Input
                  type={'password'}
                  placeholder={'Password'}
                  labelWidth='max-w-[80px]'
                  {...register('password')}
                />
                {!authState && <Input
                  type={'password'}
                  placeholder={'Re Enter Password'}
                  {...register('secondPassword')}

                  labelWidth='max-w-[140px]' />}
                <button type='submit' className='bg-green-400 p-2 my-12 mx-24 rounded-lg font-bold' >{authState ? "Log In" : "Sign Up"}</button>
              </div>
            </form>
          </div>
          }
        </div>
      </div>

    </>
  )
}

export default Auth