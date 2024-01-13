import DatabaseConnection from "../DatabaseConnection"
import { getIO } from '../controller/socket';
require('dotenv').config();


class CallTaxi{
    connection : DatabaseConnection;
    user_email : string;
    user_location: string;
    user_destination: string;

    constructor(user_email:string, user_location:string, user_destination:string){
        this.connection = new DatabaseConnection()
        this.user_email = user_email
        this.user_location = user_location
        this.user_destination = user_destination
    }

    callTaxi = async () => {
        console.log("callTaxi function called SQL")
        const query = `INSERT INTO rides (email, location, destination, ride_date) VALUES (?, ?, ?, NOW())`;
        const params = [this.user_email, JSON.stringify(this.user_location), JSON.stringify(this.user_destination)];

        const result: any = await this.connection.performQuery(query, params);

        const io = getIO();
        io.emit('callTaxi', {data: {email:this.user_email,location:this.user_location,destination:this.user_destination} });
    
        if (result.affectedRows === 0) {
            return { status: false, data: null, message:"Call Taxi failed. Email or Password incorrect" };
        }
    
        return { status: true, data: null, message:"Call Taxi success" };
    }
    
    
    
}

export default CallTaxi