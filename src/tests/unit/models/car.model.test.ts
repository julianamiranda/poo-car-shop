// template para criação dos testes de cobertura da camada de model

import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/cars.model';
import { Model } from 'mongoose';
import { allCarsMock, carMock, carMockWithID } from '../../utils/data';
const { expect } = chai;

describe('Car Model', () => {
	const carModel = new CarModel();

	before(async () => {
		sinon.stub(Model, 'create').resolves(carMockWithID);
		sinon.stub(Model, 'find').resolves(allCarsMock);
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
});
