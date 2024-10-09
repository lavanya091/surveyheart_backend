const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    productname:{
        type:String,
        required:true,
        unique:true,
    },
	productprice:{
        type:Number,
        required:true,
    },
	productimage:{
        type:String,
    },
	productdescription:{
        type:String,
    }
})
module.exports=mongoose.model("Product",productSchema)