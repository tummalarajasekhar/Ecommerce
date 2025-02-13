const express = require('express');
const Product = require('../models/Product.js')
const protect = require('../middleware/authMiddleware.js')

const router = express.Router()


router.get('/', async (req, res) => {
    const products = await Product.find()
    res.json(products)
})

router.post('/', async (req, res) => {
    // if (req.user.isAdmin) return res.status(403).json({ message: "not authorized" })
    const { name, discription, price, category, stock, image, video } = req.body
const product=new Product({name,discription,price,category,stock,image,video})
    await product.save()
    res.status(201).json(product)
})
module.exports=router