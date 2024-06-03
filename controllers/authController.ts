import { Request, Response } from "express";
import conn from "../config/database";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { logResult, login, register } from "../types/interfaces";
// import register from '../types/interfaces'
const saltRounds : number = 10 ;
// require('../dotenv').config();


export const doRegister = async (req : Request,res : Response) =>{
  try {
    const {fullname , email , pass , conpass} = req.body as register;

    bcrypt.hash(conpass , saltRounds , async <T,S>(err : T, hash : S)=>{

    let query : string = `insert into users (name , email , password) values (? ,? ,?)`
    await conn.promise().query(query,[fullname,email,hash])
    
    res.json("user added successfully")

    })


  } catch (error : unknown) {
    console.log(error)
  }
}

export const doLogin = async  (req: Request , res : Response) =>{
  try {
    const {email , password} = req.body as login ;
    console.log(req.body)
    let query : string = `select * from users where email = ?`
    let result : logResult[][] = await conn.promise().query(query,[email]) as logResult[][];

    if(result[0].length === 0)
    {
       res.json("Invalid email or password")
    }
    else{
      const id:number = result[0][0].id ;
      const dbpass : string = result[0][0].password ;
      bcrypt.compare(password , dbpass , (err ,result : boolean)=>{
        if(result)
        {
            let token : string = jwt.sign({id} ,"howhellohowareyou",{expiresIn :'1h'})
            res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true })
            res.json({msg :"login successfully" , jwttoken:token , user:id})
        }
        else{
          console.log(err);
          res.json("Invalid email or password")
        }
      })
     
    }

  } catch (error) {
    console.log(error)
  }
}