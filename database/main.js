import express from "express"
import mongoose from "mongoose"
import { Skincare } from "./skincare.js"
import cors from "cors";



const app = express()
const port = 3000
const db=await mongoose.connect('mongodb://127.0.0.1:27017/skincare');
app.use(cors());

app.get('/', async(req, res) => {
  

  const data=await Skincare.find({})
  
  res.send('Hello World!')
})

app.get("/ingredients",async(req,res)=>{
    const data=await Skincare.find({})

    res.json(data)

})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})