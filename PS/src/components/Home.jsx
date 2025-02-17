import { useState, useEffect } from 'react'
import React from 'react'
import Card from './Card.jsx'
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProducts } from '../createSlice/productSlice.js';
import { fetchCartItems } from '../createSlice/productSlice.js';





function Home({ setauthOpen ,setPopMessage }) {

  const dispatch = useDispatch()

  //  console.log(JSON.parse(localStorage.getItem('token')).token)
  
  
  // console.log(token.token)


  const token = JSON.parse(localStorage.getItem('token'))


  useEffect(() => {
    dispatch(fetchProducts());
    
           if (token)
                dispatch(fetchCartItems(token.token))
        

// console.log(token)
   
  },[dispatch]);

  const findUser = useSelector(state => state.auth.users).length == 0
  

  
  const navigate = useNavigate()
  const products = useSelector(state => state.products.products)
  // console.log(useSelector(state=>state.products))


  const [cart, setCart] = useState([])
  const cartdummy = useSelector(state => state.products.cart)
  // setCart(e=>cartdummy)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterdProducts, setFilterdProducts] = useState([])
  // console.log(products)
  console.log((cartdummy))

  useEffect(() => {
    
    const dummy = cartdummy.map(ids => {
      // console.log("Mapping cartdummy item:", ids);
      const product = products.find(child => (child._id) == (ids.productId));
      // console.log("Found product:", product);
      return product ? { ...product, quantity: ids.quantity } : null;
    }).filter(item => item !== null);


    // console.log(dummy)
    
    if (cart.length !== dummy.length || !cart.every((item, index) => item._id === dummy[index]?._id && item.quantity === dummy[index]?.quantity)) {
      setCart(dummy);
    }
  },[cartdummy]);
  // console.log(cartdummy)

  // console.log(cart);





  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilterdProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(value)
      )

    );
  };
  return (
    <div className='h-auto w-full  bg-[#FBB80F] py-5'>
      <h2 className='text-center font-bold text-4xl  '>Products</h2>

      <div className='relative flex justify-center items-center  max-w-2xl   mx-auto my-4  '>

        <input type='text' placeholder=" Search" className='bg-green-300 w-full h-lg text-3xl outline-none font-semibold rounded-lg  p-2 '
          value={searchTerm} onChange={handleSearch}></input>


      </div>



      <div className='flex justify-center  text-[2rem] m-3'>
        <div className='productNav hover:bg-amber-100'>All </div>
        <div className='productNav'>Assessories </div>
        <div className='productNav'>controller</div>
        <div className='productNav'>Gaming Audio</div>
      </div>

      <div className='  flex flex-wrap justify-evenly '>
        {
          searchTerm ? (
            (filterdProducts.length == 0 ?
              (
                <p className='text-red-600 font-extrabold text-2xl mb-8'>Item not Found you can use iur Filters above</p>
              )

              : (filterdProducts.map((product) => (



                <Card
                  key={product.id}
                  product={product}
                  // setCart={setCart}
                  cart={cart}

                  findUser={findUser}

                  setauthOpen={setauthOpen}
                  token={token?.token}
                  setPopMessage={setPopMessage}
                  


                />
              )))
            )
          ) : (products.map((product) => (



            <Card key={product.id}
              product={product}
              // setCart={setCart}
              cart={cart}
              findUser={findUser}
              // token={}

              setauthOpen={setauthOpen}
              setPopMessage={setPopMessage}
              

            />
          )))
        }
      </div>
      {cart.length > 0 && <div className='fixed bg-amber-100 right-4 bottom-6 p-6 rounded-[50%] z-20 lg:p-3' onClick={() => navigate('/cart', { state: { products } })}><ShoppingCartIcon className="h-22 w-22 text-black lg:h-12 lg:w-12" /></div>}

    </div>
  )
}


export default Home