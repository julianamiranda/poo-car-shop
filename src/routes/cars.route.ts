import { Router } from 'express';
import CarController from '../controllers/cars.controller';
import CarModel from '../models/cars.model';
import CarService from '../services/cars.services';

const cars = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

cars.post('/cars', (req, res) => carController.create(req, res));
cars.get('/cars', (req, res) => carController.read(req, res));
cars.get('/cars/:id', (req, res) => carController.readOne(req, res));

export default cars;

// código baseado no código da aula 30.2 (https://github.com/tryber/sd-020-a-live-lectures/tree/lecture/30.2/glassesStore)