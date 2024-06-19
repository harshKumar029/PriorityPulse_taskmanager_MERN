import express from 'express';
import config from 'config';
import logger from './logger/pino';
import connect from './mongodb/connect';
import userRoutes from './routes/user_routes';
import todoRoutes from './routes/todo_router';
import cors from 'cors';

const app = express();

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

app.use(express.urlencoded({ extended: false }));

// Mounting all routes
app.use('/api/auth', userRoutes);
app.use('/api/todos', todoRoutes);

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
  connect();
});
