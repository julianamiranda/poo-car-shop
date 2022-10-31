import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockWithID: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const allCarsMock = [
  {
    _id: "9edd40c86762e0fb12000009",
    model: 'Uno da Escada',
    year: 1963,
    color: 'red',
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2
  },
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  }
];

const toUpdateCarMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "pink",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};


const updatedCarMock: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "pink",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

export { carMock, carMockWithID, allCarsMock, toUpdateCarMock, updatedCarMock };