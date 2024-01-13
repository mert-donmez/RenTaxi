import express, { Express, Request, Response } from 'express';
import { initSocket } from './controller/socket';
import http from 'http';
import cors from 'cors';

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

const app = express();
const port = 4545;
const server = http.createServer(app);
initSocket(server);

app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req: Request, res: Response) => res.send({ message: 'Taxi App Running !',version:'1.0.0' }));


const Router = require('./routes/api')

app.use('/api', Router);

    

server.listen(port, () => console.log(`Taxi app listening on port http://localhost:${port}/`));