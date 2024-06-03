import express, { Request, Response } from 'express';
import './config/database' ;
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes'
const cors = require('cors');
require('dotenv').config();
const app = express() ;
app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use('/auth',authRoutes)

app.get('/',(req : Request,res : Response)=>{
  res.json('hello')
})

app.listen(5000,()=>{
  console.log("server running successfully")
})

