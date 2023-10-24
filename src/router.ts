import express, { Router, Request, Response } from 'express';
import userRouter from './modules/User/userController';
import movieRouter from './modules/Movie/movieController';
const router: Router = express.Router();


router.use('/users', userRouter);
router.use('/movies', movieRouter);


router.get('/', async (req: Request, res: Response) => {
    try {
        res.send("Welcome")
    } catch (err) {
        res.status(400).json({ message: "Failed" });
    }
});


export default router;