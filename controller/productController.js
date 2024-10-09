const express = require("express");
const Product = require("../models/Product");
const createProd = async (req, res) => {
  try {
    const { productname, productprice, productimage, productdescription } =
      req.body;
    if (!productname || !productprice) {
      return res
        .status(404)
        .json({message:"Provide name, price and description"})
    }
    const exsistProd = await Product.findOne({ productname: productname });
    if (exsistProd) {
      return res.status(409).send("Product already exists");
    }
    const addproduct = new Product({
      productname,
      productprice,
      productimage,
      productdescription,
    });
    await addproduct.save();
    return res
      .status(201)
      .json({ message: "Data is added", product: addproduct });
  } catch (err) {
    return res
      .status(404)
      .json({ message: "Error in adding data", error: err.message });
  }
};
module.exports = createProd;
