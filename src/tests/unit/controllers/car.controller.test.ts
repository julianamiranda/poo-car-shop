// template para criação dos testes de cobertura da camada de controller

import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/cars.model';
import CarService from '../../../services/cars.services';
import CarController from '../../../controllers/cars.controller';
import { Request, Response } from 'express';
import { allCarsMock, carMock, carMockWithID, updatedCarMock } from '../../utils/data';
const { expect } = chai;

describe('Car Controller', () => {
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

  describe('Create Car', () => {
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

  describe('Read Car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'read').resolves(allCarsMock);
    })

    it('Success', async () => {

      await carController.read(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(allCarsMock)).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'readOne').resolves(carMockWithID);
    })

    it('Success', async () => {
      req.params = { id: carMockWithID._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithID)).to.be.true;
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      sinon.stub(carService, 'update').resolves(updatedCarMock)
      await carController.update(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(updatedCarMock)).to.be.true;
    })
  })
});