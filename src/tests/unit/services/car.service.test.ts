// template para criação dos testes de cobertura da camada de service

import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/cars.model';
import CarService from '../../../services/cars.services';
import { allCarsMock, carMock, carMockWithID } from '../../utils/data';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithID);
    sinon.stub(carModel, 'read').resolves(allCarsMock);
  });

  after(() => sinon.restore());

  describe('Create Car', () => {
    it('Success', async () => {
      const result = await carService.create(carMock);
      expect(result).to.be.deep.equal(carMockWithID);
    })

    it('Failure', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Read Car', () => {
    it('Success', async () => {
      const result = await carService.read();
      expect(result).to.be.deep.equal(allCarsMock);
    })
  });
});