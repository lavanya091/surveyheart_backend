const express=require("express")
const mongoose=require("mongoose");
const createSale=require("./controller/saleController")
const createAgent = require("./controller/agentController");
const createLead = require("./controller/leadController");
const createProd = require("./controller/productController")
const getSalesByAgent = require("./controller/salesSummaryController");

const app=express();
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/AgentProdLead")

.then(()=>{
    console.log("Database is connected")
})
.catch((err)=>{
    console.error("Database is not created",err)
})

app.post("/agents",createAgent);
app.post("/lead",createLead);
app.post("/product",createProd);
app.post("/sales",createSale);
app.get("/sales/agent/:agent_email", getSalesByAgent)

app.listen(5000,()=>{
    console.log("Server is running on prot 5000")
})