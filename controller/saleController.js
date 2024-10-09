const mongoose = require("mongoose");
const Sale = require("../models/Sale");
const Lead = require("../models/leads");
const Agent = require("../models/Agent");

const createSale = async (req, res) => {
  try {
    const {  agenteMail,customereMail, products_sold} = req.body;
    if (!agenteMail || !customereMail || !products_sold) {
      return res
        .status(404)
        .json({
          message: "Provide agentemail, customeremail and product_sold details",
        });
    }
    // const lead=await Lead.findOne({email:customereMail});
    // const agent=await Agent.findOne({email:agenteMail});
    // if(!lead || !agent){
    //     return res.status(404).json({message:'Invalid lead or agent'})
    // }
    console.log("Received agent email:", agenteMail);
    console.log("Received customer email:", customereMail);

    const agent = await Agent.findOne({ email: agenteMail });

    if (!agent) {
      return res.status(404).json({ message: "agent not found" });
    } 

    const lead = await Lead.findOne({ email: customereMail });
    console.log("Found lead:", lead);
    if (!lead) {
      return res.status(404).json({ message: "Customer lead not found" });
    }
    
    const exsistingSale = await Sale.findOne({
      agentemail: agenteMail,
      customeremail: customereMail,
    });
    if (exsistingSale) {
      return res.status(400).json({ message: "A sale has already exsisted" });
    }

    const newSale = new Sale({
      agenteMail,
      customereMail,
      products_sold,
    });
    await newSale.save();
    return res
      .status(201)
      .json({ message: "Sale Recorded Successfully", sale: newSale });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating sale", error: err.message });
  }
};
module.exports = createSale;
