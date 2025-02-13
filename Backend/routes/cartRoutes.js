const express = require('express')
const router = express.Router()
const Cart = require("../models/Cart")
const Product = require('../models/Product')
const authMiddleware = require('../middleware/authMiddleware.js')


// getuserCart
router.get('/', authMiddleware, async (req, res) => {
    try {
        // console.log(req.user.id)
        const cart = await Cart.find({ userId: req.user.id }).select('items')
        // console.log(cart)
        if (!cart) return res.json({ success: true, cart: { items: [] } })
        res.json({ success: true, cart })
    } catch (error) {
        // console.log(error.message)
        res.status(500).json({ success: false, message: error.message })
    }
})

router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { productId, quantity } = req.body
        const userId = req.user.id
        // console.log(req.user)
        const product = await Product.findById(productId)
        if (!product) return res.status(404).json({ success: false, message: "Product not found" })
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] })
        }
        else {
            cart.items.push({ productId, quantity })
        }
        await cart.save()
        res.json({ success: true, message: "Item added to cart", cart })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

router.delete("/remove/:productId", async (req, res) => {
    try {
        console.log("🔥 Incoming Request:", req.method, req.url);
        console.log("✅ Params:", req.params);
        console.log("✅ Query:", req.query);
        const { productId } = req.params
        const { userId } = req.query
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" })
        }
        cart.items = cart.items.filter(item => item.productId.toString() !== productId)
        await cart.save()

        res.json({ success: true, message: "Item removed from Cart", cart })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

router.put('/setquantity', async (req, res) => {
    try {
        console.log('raja')
        
        const { productId, quantity,userId } = req.body
       
        let cart = await Cart.findOne({ userId })
        if (!cart) return res.status(404).json({ success: false, message: "Product not in cart" })
        const item = cart.items.find(item => item.productId.toString() === productId)
        if (!item) return res.status(404).json({ success: false, message: "Product not in cart" })
        item.quantity = quantity
        await cart.save()
        res.json({success:true,message:"Cart updated",cart})

    }catch(error){
        res.status(500).json({success:false,message:error.message})

    }

})
module.exports = router