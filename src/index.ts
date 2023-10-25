require("dotenv").config()
import express, { Request, Response, NextFunction } from "express"
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from "./router";
import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()



const port = process.env.SERVER_PORT || 8000
const app = express()
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});


app.listen(port, async () => {
    console.log(`server started at http://localhost:${port}`);
})