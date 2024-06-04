import { Connection } from "mysql2";
import { database } from "../types/interfaces";

const sql = require('mysql2');
require('dotenv').config();

const conn : Connection = sql.createConnection({
    host : process.env.HOST,
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  } as database);

  conn.connect((err : Error | null)=>{
    console.log("Connection Created  !!")
    if(err) throw(err) ;
  })

export default conn ;