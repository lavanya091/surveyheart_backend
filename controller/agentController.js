const express = require("express");
const Agent = require("../models/Agent");
const joi = require("joi");

const createAgent = async (req, res) => {
  try {
    const validationSchema = joi.object({
      name: joi.string().min(3).required(),
      email: joi.string().email().required(),
      phone: joi.string().length(10).pattern(/^\d+$/).required().messages({
        'string.length': 'Phone number must be exactly 10 digits long.',
        'string.pattern.base': 'Phone number must contain only digits.'
      }),
      company_id: joi.number().integer().min(1).required()
    });

    const { error } = validationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, phone, company_id } = req.body;

    const existagent = await Agent.findOne({ email: email });
    if (existagent) {
      return res.status(409).send("Agent already exists");
    }

    const newAgent = new Agent({
      name,
      email,
      phone,
      company_id,
    });

    await newAgent.save();
    
    return res
      .status(201)
      .json({ message: "Agent created successfully", agent: newAgent });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating agent", error: err.message });
  }
};

module.exports = createAgent;
