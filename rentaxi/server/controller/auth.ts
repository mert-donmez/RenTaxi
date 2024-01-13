import { MD5 } from "md5-js-tools"
import DatabaseConnection from "../DatabaseConnection"
require('dotenv').config();

var jwt = require('jsonwebtoken');

class Auth{
    connection : DatabaseConnection
    email : string 
    password : string
    role : string 

    constructor(email:string, password:string){
        this.connection = new DatabaseConnection()
        this.email = email
        this.password = password
        this.role = "user"
    }
    
    generateToken = async (user:any) => {
        console.log("generateToken function called")
        const token = jwt.sign({id:user.id, email:user.email,refferal_code:user.refferal_code}, process.env.SECRET_KEY as string)
        return token
    }

    login = async () => {
        console.log("login function called SQL")
        const query = `SELECT * FROM users WHERE users.email = ? AND users.password = ?`;
        const params = [this.email, MD5.generate(this.password)];
        const result: any = await this.connection.performQuery(query, params);
    
        if (result.length === 0) {
            return { status: false, data: null, token:null, message:"Login failed. Email or Password incorrect" };
        }
    
        const token = await this.generateToken(result[0])
        return { status: true, data: result[0], token:token, message:"Login success" };
    }
    

    checkEmailExist = async (email:string) => {
        console.log("checkEmailExist function called SQL")
        const query = `SELECT * FROM users WHERE users.email = ?`;
        const params = [email];
        const result: any = await this.connection.performQuery(query, params);
    
        if (result.length === 0) {
            return { status: false, data: null, message:"Email not exist" };
        }
    
        return { status: true, data: result[0], message:"Email exist" };
    }


    register = async () => {
        console.log("register function called SQL")
        const checkEmailExist = await this.checkEmailExist(this.email)
        if(checkEmailExist.status){
            return { status: false, data: null, message:"Email already exist" };
        }
        const query = `INSERT INTO users (email, password,role) VALUES (?, ?, ?)`;
        const params = [this.email, MD5.generate(this.password),'user'];
        const result: any = await this.connection.performQuery(query, params);
    
        if (result.affectedRows === 0) {
            return { status: false, data: null, message:"Register failed" };
        }
    
        return { status: true, data: result, message:"Register success" };
    }
    


    



    
    
}

export default Auth