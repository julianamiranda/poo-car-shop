// template para criação dos testes de cobertura da camada de service

import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/cars.model';
import CarService from '../../../services/cars.services';
import { allCarsMock, carMock, carMockWithID, toUpdateCarMock, updatedCarMock } from '../../utils/data';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithID);
    sinon.stub(carModel, 'read').resolves(allCarsMock);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithID)
      .onCall(1).resolves(null);
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

  describe('ReadOne Frame', () => {
    it('Success', async () => {
      const result = await carService.readOne(carMockWithID._id);
      expect(result).to.be.deep.equal(carMockWithID);
    });

    it('Failure', async () => {
      let error;
      try {
        await carService.readOne('5edd40c87873e0fb13000004');
      } catch (err: any) {
        error = err;
      }
      expect(error?.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      sinon.stub(carModel, 'update').resolves(updatedCarMock);
      const result = await carService.update('4edd40c86762e0fb12000003', toUpdateCarMock);
      expect(result).to.be.deep.eq(updatedCarMock);
      sinon.restore();
    })

    it('Failure - Zod Error', async () => {
      let error;
      try {
        await carService.update('4edd40c86762e0fb12000003', { INVALID: "OBJECT" })
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError)
    })

    it('Failure - Object not Found', async () => {
      sinon.stub(carModel, 'update').resolves(null);
      let error: any;
      try {
        await carService.update('62cf1fc6498565d94eba52cd', toUpdateCarMock)
      } catch (err) {
        error = err;
      }
      expect(error?.message).to.be.eq(ErrorTypes.ObjectNotFound)
    })
  })
});