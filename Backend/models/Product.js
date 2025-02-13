const mongoose = require('mongoose')


const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        discription: { type: String, required: true },
        price: { type: Number, required: true },

        category: { type: String, required: true },
        stock: { type: Number, required: true },
        image: { type: String, required: true },
        video:{type:String,required:false},

    },{timestamps:true}
)
module.exports=mongoose.model('Product',productSchema)