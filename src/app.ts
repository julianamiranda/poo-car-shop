import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import cars from './routes/cars.route';

const app = express();

app.use(express.json());
app.use('/cars', cars);
app.use(errorHandler);

export default app;
