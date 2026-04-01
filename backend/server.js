import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './config/db.js';
import path from 'path';
import invoiceRouter from './routes/invoiceRouter.js';
import businessProfileRouter from './routes/businessProfileRouter.js';
import aiInvoiceRouter from './routes/aiInvoiceRouter.js';
import { requireAuth } from "@clerk/express";


const app = express();
const port = 4000;

// Middlewares
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));
app.use(clerkMiddleware())
app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({limit:"20mb", extended: true}));

// database
const startServer = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server Started on http://localhost:${port}`);
    });
};


//Routes
app.use('/uploads', express.static(path.join('./uploads')));

app.use('/api/invoice', invoiceRouter);
app.use('/api/businessProfile', businessProfileRouter);
app.use('/api/aiInvoice', aiInvoiceRouter);


app.get('/',(req, res)=> {
    res.send("API WORKING")
});

startServer();
