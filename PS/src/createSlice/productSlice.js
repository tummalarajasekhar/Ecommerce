import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { getallproducts,getCartProducts,addProductToCart,removeProductFromCart,setQuantity } from "../api"



export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {



            const data = await getallproducts()
            
            
            return data
        } catch (error) {
            return rejectWithValue(error.message)

        }
    }
)
export const fetchCartItems=createAsyncThunk(
    'products/fetchCartItems',async(data,{rejectWithValue})=>{
        try {
            const data1=await getCartProducts(data)
            return data1.cart
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const addCartItem=createAsyncThunk(
    'products/addCartItem',async (data,{rejectWithValue})=>{
        try {
            const data1 =await addProductToCart(data)
            return data1.cart
            
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)
export const removeCartItem=createAsyncThunk(
    'products/removeCartItem',async(data,{rejectWithValue})=>{
        try {
            const data1=await removeProductFromCart(data)
        return data1.cart   
    }catch(error){
        return rejectWithValue(error.message)
    }
}
)
export const setQuantityForCart=createAsyncThunk(
    'products/setQuantityForCart',async(data,{rejectWithValue})=>{
        try{
            const data1=await setQuantity(data)
            return data1.cart
        }
        catch{
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    products: [],
    loading: false,
    error: null,
    cart:[],
    cartLoading:false,
    cartError:null
    

}


export const todoSlice = createSlice({
    name: 'allproducts',
    initialState,
    reducers: {
        removeCart:(state,actions)=>{
            state.cart=[]
        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(fetchCartItems.pending, (state) => {
                state.cartLoading = true
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                
                console.log(action)
                state.cart = [...action.payload[0].items]
                state.cartLoading = false
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.cartError = action.payload
                state.cartLoading = false
            })
            .addCase(addCartItem.pending, (state) => {
                state.cartLoading = true
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.cart = [...action.payload.items]
                console.log(action.payload.items)
                state.cartLoading = false
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.cartError = action.payload
                state.cartLoading = false
            })
            .addCase(removeCartItem.pending, (state) => {
                state.cartLoading = true
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.cart = [...action.payload.items]
                console.log(action.payload.items)
                state.cartLoading = false
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.cartError = action.payload
                state.cartLoading = false
            })
            .addCase(setQuantityForCart.pending, (state) => {
                state.cartLoading = true
            })
            .addCase(setQuantityForCart.fulfilled, (state, action) => {
                state.cart = [...action.payload.items]
                console.log(action.payload.items)
                state.cartLoading = false
            })
            .addCase(setQuantityForCart.rejected, (state, action) => {
                state.cartError = action.payload
                state.cartLoading = false
            })
            
            
    },


devTools: process.env.NODE_ENV === 'development'
}
)
export const {removeCart}=todoSlice.actions

export default todoSlice.reducer