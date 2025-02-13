import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import Card from '../Card'
import { fetchProducts,fetchCartItems } from '../../createSlice/productSlice'
import { DivideIcon } from '@heroicons/react/24/solid'

function Cart() {
  const dispatch=useDispatch()
  
   const token = JSON.parse(localStorage.getItem('token'))
  
  
    useEffect(() => {
      dispatch(fetchProducts());
      
             if (token)
                  dispatch(fetchCartItems(token.token))
          
  
  // console.log(token)
     
    },[dispatch]);
  const productsFromHome= useSelector(state=>state.products.products)
  const cartDetails=useSelector(state=>state.products.cart)
  const [mainCart,setMainCart]=useState([])
  console.log(productsFromHome,cartDetails)
 
  useEffect(()=>{
    // console.log('raja');
    
  const cartdummy=cartDetails.map((ids)=>{
    // console.log(ids.productId)
    const product=productsFromHome.find(item=>item._id===ids.productId)
    // console.log(product)
    return product ? {...product,quantity:ids.quantity} :null
  }).filter(item=>item!==null)
  setMainCart(cartdummy)
  // console.log(cartdummy)
  // setMainCart(cartdummy)
},[cartDetails])
  return (
    
      <>
      {mainCart.length>0 &&
    <div className='h-full pb-2 bg-[#FBB80F]'>
      <h2 className='text-center text-black text-[2rem] font-bold' >Check the Items Carefully and Click Checkout</h2>
      <div className='flex justify-around flex-wrap'>
        { mainCart.map((product)=>(
          <Card
          product={product}
          
          qty={product.quantity}
          />
        ))}
      </div>
      <div className='border-2 bg-white border-blue-800 p-2 m-2 rounded-2xl flex flex-col items-center justify-center'>
        <h2 className='  font-sans font-medium text-xl border-b-2 border-blue-800 pb-1 text-green-900'>Summary</h2>
      {mainCart.map((item)=>
      
       (
        <p key={item._id} className='text-center text-2xl font-semibold my-4'>{item.name} ( {item.quantity} ) : {item.price}</p>
       )
      )}
      <div className='text-2xl font-black relative  border-t-4 border-green-950'>Total : {mainCart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</div>
      </div>

      <div className=' text-center bg-green-950 max-w-xl mx-auto text-[3rem] mb-4 hover:bg-green-900 text-white rounded-2xl'>Proceed to Pay</div>
    
    </div>
}
{mainCart.length===0 && <p className='text-2xl text-center text-red-800 font-bold m-4 hover:text-3xl transform duration-500'> No Items In Cart go back and continue Shopping </p>}
    </>

  )
}

export default Cart