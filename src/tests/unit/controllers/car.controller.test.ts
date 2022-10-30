// template para criação dos testes de cobertura da camada de controller

import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/cars.model';
import CarService from '../../../services/cars.services';
import CarController from '../../../controllers/cars.controller';
import { Request, Response } from 'express';
import { carMock } from '../../utils/data';
const { expect } = chai;

describe('Sua descrição', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => sinon.restore());

  describe('Create Frame', () => {
    beforeEach(() => {
      sinon.stub(carService, 'create').resolves(carMock);
    })

    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMock)).to.be.true;
    });
  });

});