const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false }
}, { timestamps: true })

UserSchema.pre("save",async function (next){
    if (!this.isModified("password")) return next()
        const salt= await bcrypt.genSalt(10)
    const hashed=await bcrypt.hash(this.password,   10)
    this.password=hashed

})
module.exports=mongoose.model("user",UserSchema);