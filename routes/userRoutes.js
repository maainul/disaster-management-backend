import { Router } from 'express';
import {
    loggedInCtrl,
    loginUserCtrl,
    logoutCtrl,
    registerUser
} from '../controllers/userController.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUserCtrl);
router.get('/logout', logoutCtrl);
router.get('/loggedin', loggedInCtrl);

export default router;
