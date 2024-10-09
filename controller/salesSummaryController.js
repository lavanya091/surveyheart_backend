const express = require("express");
const Sales=require("../models/Sale")
const Agent = require("../models/Agent");

const getSalesByAgent = async (req, res) => {
  try {
    const { agent_email } = req.params;
    console.log(agent_email)

    // Check if agent exists
    const agent = await Agent.findOne({ email: agent_email });
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // Fetch sales for the agent
    const sales = await Sales.find({email: agent_email }).populate({
        path:"products_sold.product",
        model:"Products"
    });

    if (sales.length === 0) {
      return res.status(404).json({ message: "No sales found for this agent" });
    }

    // Calculate total sales amount
    const totalAmount = sales.reduce((total, sale) => total + sale.amount, 0);

    return res.status(200).json({
      sales,
      totalAmount,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching sales", error: err.message });
  }
};

module.exports = getSalesByAgent;
