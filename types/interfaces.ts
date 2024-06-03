import { RowDataPacket } from "mysql2"

 export interface register  {
  fullname : string,
  email : string ,
  pass : string,
  conpass : string
}

export interface login  {
  email : string ,
  password : string
}

export interface logResult extends RowDataPacket {
  id : number ,
  name : string ,
  email : string ,
  password : string
}

export interface database {
  host : string  ,
  database :  string ,
  user : string ,
  password : string
}