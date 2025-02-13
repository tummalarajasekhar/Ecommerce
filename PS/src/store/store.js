import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../createSlice/productSlice";
import  authSlice  from "../createSlice/authSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice,
        products:productSlice
    }


})