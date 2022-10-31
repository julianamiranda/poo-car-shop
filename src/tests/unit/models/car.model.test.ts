// template para criação dos testes de cobertura da camada de model

import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/cars.model';
import { Model } from 'mongoose';
import { allCarsMock, carMock, carMockWithID } from '../../utils/data';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Car Model', () => {
	const carModel = new CarModel();

	before(async () => {
		sinon.stub(Model, 'create').resolves(carMockWithID);
		sinon.stub(Model, 'find').resolves(allCarsMock);
		sinon.stub(Model, 'findOne').resolves(carMockWithID);
	});

	after(() => sinon.restore());

	describe('creating a car', () => {
		it('successfully created', async () => {
			const result = await carModel.create(carMock);
			expect(result).to.be.deep.equal(carMockWithID);
		});
	});

	describe('searching all cars', () => {
		it('successfully found', async () => {
			const result = await carModel.read();
			expect(result).to.be.deep.equal(allCarsMock);
		});
	});

	describe('searching a frame', () => {
		it('successfully found', async () => {
			const result = await carModel.readOne('4edd40c86762e0fb12000003');
			expect(result).to.be.deep.equal(carMockWithID);
		});

		it('invalid id', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
});
