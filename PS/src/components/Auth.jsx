import React, { useState, useEffect } from 'react'
import Input from './Input.jsx'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { signup, login, otpGenerator } from '../createSlice/authSlice.js'
import { fetchCartItems } from '../createSlice/productSlice.js'


function Auth({ setAuthOpen, setUserExists, setPopMessage }) {
  const dispatch = useDispatch()
  const [authState, setAuthState] = useState(true)
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm()
  const [loader, setLoader] = useState(false)
  const user = useSelector(state => state.auth)
  const [authSuccess, setAuthSuccess] = useState(false)
  const errorfromdatabase = user?.error
  const [otppassword, setOtpPassword] = useState(false)

  // const error2=useSelector(state=>state.auth.error)
  // console.log(error2)
  
  useEffect(() => {
    

    if (user.users.length != 0) {
      setPopMessage('Successfully Logged In')
      setError(' ')
      setUserExists(e => !e)
      setAuthOpen(e => !e)
      const token = JSON.parse(localStorage.getItem('token'))
      if (token)
        dispatch(fetchCartItems(token.token))
    }
    else if(user.otpsuccess){
      console.log(user.otpsuccess)
      setPopMessage('OTP sent')
    }
    else {
      setError(errorfromdatabase)
      setLoader(false)
    }


  }, [user])


  const handleAuth = async (data) => {
    // setLoader(true)

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


      }  else if (otppassword) {
        
        dispatch(login({ email: data.email, password: data.password,otp:data.otp,login:true }))

      }

      else {
        
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
        setError('Password should be same ')
      }
      else if (!otppassword) {
        setOtpPassword(true)
        dispatch(otpGenerator({ email: data.email, signup: true }))

      }

      else {
        // dispatch(otpGenerator({email:data.email}))
        dispatch(signup({ name: data.name, email: data.email, password: data.password, otp: data.otp }))





      }



    }
  }
  const handleForgotPassword = (data) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      setError('Enter a valid mail')
      return
    }
    if (!otppassword) {



      dispatch(otpGenerator({ email: data.email }))
    }
    setOtpPassword(e => !e)


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
              <p className='  w-14 text-3xl  p-2 cursor-pointer ' onClick={() => setAuthOpen((e) => !e)}>❌</p>
            </div>

            <div className='text-center font-bold text-6xl lg:text-4xl'>{authState ? "Log In" : "Sign Up"}</div>
            {authState && <div className='flex justify-center items-center bold text-4xl md:text-3xl' onClick={() => {
              setAuthState(!authState)
              setOtpPassword(false)
            }}> Don't have a account ? <p className='pl-4 text-blue-700 cursor-pointer'>SignUp </p></div>}
            {!authState && <div className='flex justify-center items-center bold text-4xl' onClick={() => setAuthState(!authState)}>have a account ? <p className='pl-4 text-blue-700 cursor-pointer'>LogIn</p></div>}
            {error && <div className='text-red-600 text-lg font-bold mt-4 text-center'>{error}</div>}
            <form onSubmit={handleSubmit(handleAuth)}>
              <div className='flex flex-col  mx-auto max-w-[90%] mt-[5%]   '>
                {!authState && <Input
                  type='text'
                  placeholder={"Name"}
                  {...register("name")}
                  labelWidth='max-w-[100px]'

                />}
                <Input
                  type='email'
                  placeholder={"Email"}
                  {...register("email")}
                  labelWidth='max-w-[100px]'

                />
                <Input
                  type={'password'}
                  placeholder={'Password'}
                  labelWidth='max-w-[150px]'
                  {...register('password')}
                />
                {(authState && otppassword) && <Input
                  type={'password'}
                  placeholder={'Re enter the updated password'}
                  {...register('loginsecondPassword')}

                  labelWidth='max-w-[270px]' />}
                {authState && <div className=' text-blue-800 ml-2 cursor-pointer transform -translate-y-8 ' onClick={() => handleSubmit(handleForgotPassword)()}>{otppassword ? 'Know Password !!' : 'Forgot Password ??'}</div>}

                {!authState && <Input
                  type={'password'}
                  placeholder={'Re Enter Password'}
                  {...register('secondPassword')}

                  labelWidth='max-w-[270px]' />}
                {otppassword &&
                  <div className='items-center'>
                    <label htmlFor="otp" className='mx-4 text-2xl '>OTP :</label>
                    <input type='text' id='otp' {...register('otp')} className='border-2 border-black max-w-[20%] h-16 rounded-2xl shadow-amber-600 mx-auto p-2 text-3xl' />
                  </div>
                }
                <button type='submit' className='bg-green-400 p-4 my-12 mx-24 rounded-lg font-medium text-4xl md:text-2xl' >{authState ? otppassword ? "Verify OTP" : "Log in" : otppassword ? "Verify OTP" : "Send OTP"}</button>
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