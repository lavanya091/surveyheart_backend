const express=require("express");
const Leads=require("../models/leads")
const Agent=require("../models/Agent")
const createLead = async (req,res)=>{
    try{
        const {name,email,phonenumber,age,city,state,country,pincode,agent_email} = req.body;
    if(!name || !email || !phonenumber || !city || !state || !country || !pincode || !agent_email){
        return res.status(400).send("All fields are mandatory")
    }
        const existagent=await Agent.findOne({email:agent_email})
        if(!existagent){
            return res.status(404).json({message:"Agent not found"})
        }
        const existingLead = await Leads.findOne({ email });
        console.log(existingLead)
        if (existingLead) {
            return res.status(404).json({ message: "Lead with this email already exists" });
        }
        
        const newLead = new Leads({
            name,
            email,
            phonenumber,
            age,
            city,
            state,
            country,
            pincode,
            agent_email
        })
        await newLead.save();
        return res.status(201).json({message:"New lead created",lead:newLead})
    }
    catch(err){
        return res.status(404).json({message:"Error in creating a newLead",error:err.message})
    }
}
module.exports=createLead;