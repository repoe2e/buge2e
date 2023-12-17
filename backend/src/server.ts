import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from './routes';
import swaggerUi from 'swagger-ui-express';

import swaggerDocs from "./swagger.json";


const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, nex: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        mesage: 'Internal server error.'
    })

})

app.listen(3333, () => console.log('Servidor está rodando em http://localhost:3333,'));