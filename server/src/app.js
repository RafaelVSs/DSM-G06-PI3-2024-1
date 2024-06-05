import dotenv from 'dotenv'
dotenv.config()

import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

const app = express();
app.use(cors());

import mongoose from 'mongoose'
mongoose.connect(process.env.DATABASE_URL)

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

import ticketRouter from "./routes/ticket.js";
app.use("/ticket", ticketRouter);

import analistaRouter from "./routes/analista.js";
app.use("/analista", analistaRouter);

import categoriaRouter from "./routes/categoria.js";
app.use("/categoria", categoriaRouter);

import salaRouter from "./routes/sala.js";
app.use("/sala", salaRouter);



export default app;
