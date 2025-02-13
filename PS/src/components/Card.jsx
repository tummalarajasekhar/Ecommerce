import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartItem,removeCartItem,setQuantityForCart } from '../createSlice/productSlice';
// import { find } from '../../../Backend/models/Product';
// import cardbg from '../assets/ps5.jpg'
// import videobg from '../assets/card1.mp4'


export default function Card({ product, setCart, cart = [], qty = 0, findUser = false, setauthOpen, token, handleCart }) {


  const videoRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(qty)
  const [AddToCart, setAddToCart] = useState(true)
  const findCart = useSelector(state => state.products.cart)
  // console.log(findCart)
   useEffect(()=>{
      if (quantity!=qty){
        const userId=JSON.parse(localStorage.getItem('token')).user.id
       
          dispatch(setQuantityForCart({productId:product._id,quantity:quantity,userId:userId}))
       
      }
  
    },[quantity])

  useEffect(() => {
    const dum = findCart.some(item => item.productId === product._id)
    //  console.log(dum)

    if (dum) {
      // console.log('false')
      setAddToCart(false)
    }
  }, [findCart, findUser])
  // console.log(AddToCart)




  function handleCart(product) {
    if (findUser) {
      setauthOpen(e => !e)
    }

    else {
      const token = JSON.parse(localStorage.getItem('token')).token
      dispatch(addCartItem({ data: { productId: product._id, quantity: 1 }, ticket: token }))
    }
  }
  const handleRemoveFromCart=()=>
  {
    console.log('raja')
    const userId=JSON.parse(localStorage.getItem('token')).user.id
    // console.log(userId,product._id)
    dispatch(removeCartItem({data:{productId:product._id,userId:userId}}))
  }
  const handleQuantity=(data)=>{
    setQuantity(e=>Math.max(e+data,1))
   
    
  }

  // console.log(cart)

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.style.opacity = 1;
      setTimeout(() => {
        videoRef.current.play().catch(error => console.error("Play interrupted:", error));
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    videoRef.current.style.opacity = 0;  // Hide video
    videoRef.current.pause();
    videoRef.current.currentTime = 0;  // Reset video to the beginning
  };
  // console.log(product)
  // const handleAddToCart=()=>{

  //     dispatch(addCartItem({data:{productId:product._id,quantity:1},ticket:token}))
  // }

  return (
    <>

      <div className='  p-2 m-2'>

        <div className=' border-black bg-no-repeat bg-center mx-8 my-4 rounded-lg hover:scale-105 transform transition-transform duration-500 min-w-[350px] min-h-[400px] md:min-w-[300px] md:min-h-[350px] lg:min-w-[250px] lg:min-h-[300px] '
          style={{ backgroundImage: `url('${product.image}')`, backgroundSize: 'cover' }}>

          <div
            className=" w-full h-full  rounded-lg  "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <video
              ref={videoRef}
              className="  absolute w-full h-full  object-cover opacity-0 transition-opacity duration-300 rounded-lg "
              muted
              loop

            >
              <source src={product.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>



          </div>
        </div>
        <div className='ml-9 '
        >
          <h2 className='font-bold text-2xl text-pretty h-auto  max-w-[350px] md:max-w-[300px]  lg:max-w-[250px] '> {product?.name}</h2>
          <h2 className='  font-semibold text-2xl'>Rs. {product?.price}</h2>

          {qty > 0 &&
            <div className=' flex mt-5  '>
              <div className='  flex justify-between items-center gap-4 scale-125 font-bold text-xl lg:text-sm'>{quantity}
                <div>
                  <div className='border-2 border-black bg-green-400 cursor-pointer hover:bg-amber-100 p-1' onClick={() => { handleQuantity(1)}}>➕</div>
                  <div className='border-x-2 border-b-2 border-black bg-red-400 cursor-pointer hover:bg-amber-100 p-1 ' onClick={()=>handleQuantity(-1)}>➖</div>
                </div>
                <div className='border border-black p-2 bg-red-200 rounded-xl' onClick={() => { handleRemoveFromCart() }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg></div>
              </div>




            </div>}

          {AddToCart ? (!qty && <div className=' flex justify-start items-center  w-auto h-[50px]  '>
            <button className='z-30 bg-green-700 p-2 mt-5  rounded-lg text-3xl  font-bold text-amber-100 hover:text-black transform duration-500'
              onClick={() => handleCart(product)} >Add to Cart</button>

          </div>) :
            (!qty && <div className=' flex justify-start items-center m-2 w-auto h-[50px]  '>
              <button className='z-30 bg-blue-200 p-2 mt-5  rounded-lg text-3xl hover:bg-blue-400 font-bold text-black  transform duration-500'
                onClick={() => navigate('/cart', { state: { cart } })} >GO to Cart</button>

            </div>)}
        </div>

      </div>
    </>



  )
}

