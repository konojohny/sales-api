import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate"
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction ) => {
    if(error instanceof AppError){
        res.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }

    res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

app.listen(3000, () => {
    console.log("Server executing in PORT 3000")
});