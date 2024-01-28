import express from 'express';
import config from 'config';
import logger from './logger/pino';
import connect from './mongodb/connect';
import userRoutes from './routes/user_routes';
import todoRoutes from './routes/todo_router';
import cors from 'cors';

const port = config.get("port")as number;
const host = config.get("host")as string;

const app=express();
// Middleware for CORS
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });

app.use(express.urlencoded({extended:false}));

// Mount the auth routes
app.use('/api/auth', userRoutes);
app.use('/api/todos', todoRoutes );

import { Request, Response } from 'express';
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });
app.listen(port,host,()=>{
 logger.info(`server listen at http//${host}:${port}`);
 console.log({ message: 'Test API is working!' })
 connect();
//  routes(app);
})
