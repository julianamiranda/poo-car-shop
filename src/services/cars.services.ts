import { ErrorTypes } from '../errors/catalog';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const result = CarZodSchema.safeParse(obj);
    if (!result.success) throw result.error;
    return this._car.create(result.data);
  }

  public async read(): Promise<ICar[]> {
    const result = await this._car.read();
    if (!result) throw new Error(ErrorTypes.ObjectNotFound);
    return result;
  }
}

export default CarService;

// código baseado no código da aula 30.2 (https://github.com/tryber/sd-020-a-live-lectures/tree/lecture/30.2/glassesStore)