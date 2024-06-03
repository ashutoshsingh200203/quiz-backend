import express, { Router } from 'express';
import { doLogin, doRegister } from '../controllers/authController';
const router : Router = express.Router() ;

router.route('/register').post(doRegister);
router.route('/login').post(doLogin)

export default router ;