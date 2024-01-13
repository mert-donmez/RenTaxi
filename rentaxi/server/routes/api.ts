import express, {Request, Response } from 'express';
import bodyParser from 'body-parser';
import Auth from '../controller/auth';
import CallTaxi from '../controller/callTaxi';

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:false}))



router.post('/login', async (req: Request, res: Response) => {
    console.log('/login called')
    const {email, password} = req.body
    const login = new Auth(email, password)
    const result = await login.login()
    res.send(result)
})


router.post('/register', async (req: Request, res: Response) => {
    console.log('/register called')
    const {email, password} = req.body
    const register = new Auth(email, password); 
    const result = await register.register();
    res.send(result);
});

router.post('/callTaxi', async (req: Request, res: Response) => {
    console.log('/callTaxi called')
    const {email, location, destination} = req.body
    const callTaxi = new CallTaxi(email, location, destination); 
    const result = await callTaxi.callTaxi();
    res.send(result);
});




module.exports = router