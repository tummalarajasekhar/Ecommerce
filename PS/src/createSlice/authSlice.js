import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { Signup ,Login,generateotp} from "../api";

export const login= createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {



            const data1 = await Login(data)
            
            
            return data1
        } catch (error) {
            return rejectWithValue(error)

        }
    }
)

export const signup= createAsyncThunk(
    "auth/signup",
    async (data, { rejectWithValue }) => {
        try {



            const data1 = await Signup(data)

            // console.log(data1)
            
            
            return data1
        } catch (error) {
            return rejectWithValue(error)

        }
    }
)
export const otpGenerator=createAsyncThunk(
    "auth/otpGenerator",async(data,{rejectWithValue})=>{
        try{
        const data1=await generateotp(data)
        return data1
        }catch(error){
        return rejectWithValue(error)
        
        }

    }
)



const initialState={
    users:[],
    loading:false,
    error:null,
    
}
export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state,action)=>{
                state.users=[]
                localStorage.clear()
        },
        setUser:(state,action)=>{
            state.users=action.payload
        }

        // signup: (state,action)=>{
        //      Signup(action.payload)
           
        // },
    //     login: async (state,action)=>{
    //         const data=await Login(action.payload)
    //         console.log(data)
    //         console.log(state.users)
    //         state.users=data
          
    //    }
        
    },
    extraReducers: (builder) => {
            builder
                .addCase(login.pending, (state) => {
                    state.loading = true
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.users = action.payload
                    localStorage.setItem('token',JSON.stringify(action.payload))
                    state.loading = false
                })
                .addCase(login.rejected, (state, action) => {
                    console.log(action.payload)
                    state.error = action.payload.response?.data.message
                    state.loading = false
                })
                .addCase(signup.pending, (state) => {
                    state.loading = true
                })
                .addCase(signup.fulfilled, (state, action) => {
                    state.users = action.payload
                    localStorage.setItem('token',JSON.stringify(action.payload))
                    
                    state.loading = false
                })
                .addCase(signup.rejected, (state, action) => {
                    console.log(action.payload)
                    state.error = action.payload.response.data.message
                    state.loading = false
                })
               
               
               
                .addCase(otpGenerator.rejected, (state, action) => {
                    // console.log(action.payload.response.data.message)
                    state.error = action.payload.response?.data.message
                    state.loading = false
                })
               
        },
    
    devTools: process.env.NODE_ENV === 'development'


})
export const {logout,setUser}=authSlice.actions

export default authSlice.reducer