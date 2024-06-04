import express, { Request, Response } from 'express';
import './config/database' ;
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes'
import {Server} from 'socket.io'


const cors = require('cors');
require('dotenv').config();
const app = express() ;

app.use(cors({
  origin: "*" 
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use('/auth',authRoutes)

app.get('/',(req : Request,res : Response)=>{
  res.json('hello')
})

 const server = app.listen(5000,()=>{
  console.log("server running successfully")
})

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})

io.on('connection',(socket)=>{
  socket.emit('hello' , 'world')

  socket.on('howdy',(arg)=>{
    console.log(arg) ;
  })
})
