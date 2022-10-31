import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  constructor(private _service: IService<ICar>) { }

  public create = async (req: Request, res: Response<ICar>) => {
    const result = await this._service.create(req.body);
    return res.status(201).json(result);
  };

  public read = async (req: Request, res: Response<ICar[]>) => {
    const result = await this._service.read() as ICar[];
    return res.status(200).json(result);
  };

  public readOne = async (req: Request, res: Response<ICar>) => {
    const { id } = req.params;
    const result = await this._service.readOne(id) as ICar;
    return res.status(200).json(result);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this._service.update(id, req.body) as ICar;
    return res.status(200).json(result);
  };

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  };
}

export default CarController;