import axios from 'axios'

const API = axios.create(
    { baseURL: "http://localhost:5000" }
)

export const getallproducts =async () => {
    try{
    const response=await API.get('api/products')
    return response.data
    }catch(error){
        throw new Error(error.response?.data?.message || "Failed to fetch products");

    }
}

export const generateotp=async(data)=>{
    console.log(data)
    

    const response =await API.post('api/auth/generate-otp',data)
    console.log(response.data)
    return response.data
   
}


export const Signup= async(data)=>{
   const response= await API.post('api/auth/register',data)
   
   


   return response.data
}
export const Login= async(data)=>{
    const response= await API.post('api/auth/login',data)
    // console.log(response)
    return response.data
 }
 export const getCartProducts=async(data)=>{
    const response =await API.get('/api/cart',{headers: { "Authorization": `Bearer ${data}` }})
    console.log(response.data.cart[0].items)
    return response.data

 }

 export const addProductToCart=async(data)=>{
    // console.log(data)
    // {productId, quantity})
    const response=await API.post('api/cart/add',data.data, 
        {
            headers: { "Authorization": `Bearer ${data.ticket}` }
        })
    console.log(response.data)
    return response.data
 }
 export const removeProductFromCart=async(data)=>{
    // console.log(data.data.productId,data.userId,data)
    const response=await API.delete(`api/cart/remove/${data.data.productId}?userId=${data.data.userId}`)
    console.log(response.data)
    return response.data
    
 }
 export const setQuantity=async(data)=>
 {
    console.log(data)
    const response =await API.put('api/cart/setquantity',data)
    return response.data
 }


