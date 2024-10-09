const mongoose=require("mongoose");
const agentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
    },
    company_id:{
        type:Number,
        required:true,
    }
})
module.exports=mongoose.model("Agent",agentSchema)