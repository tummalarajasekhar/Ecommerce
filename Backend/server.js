require("dotenv").config();
const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const connectDB = require("./config/db");
const app=express()
connectDB()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api/auth',require('./routes/authRoutes'))
app.use('/api/products',require('./routes/productRoutes'))
app.use('/api/cart',require('./routes/cartRoutes'))



const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log(`raja server is running in port ${PORT}`))