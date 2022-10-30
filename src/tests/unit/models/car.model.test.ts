// template para criação dos testes de cobertura da camada de model

import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/cars.model';
import { Model } from 'mongoose';
import { carMock, carMockWithID } from '../../utils/data';
const { expect } = chai;

describe('Car Model', () => {
	const carModel = new CarModel();

	before(async () => sinon.stub(Model, 'create').resolves(carMockWithID));

	after(() => sinon.restore());

	describe('creating a car', () => {
		it('successfully created', async () => {
			const result = await carModel.create(carMock);
			expect(result).to.be.deep.equal(carMockWithID);
		});
	});

});