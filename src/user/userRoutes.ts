import { Application } from 'express';
import { injectable, inject } from 'inversify';
import asyncWrap from '../core/asyncWrapper';
import { redis } from '../config/ConnectDb'
import TYPES from './types';
import BaseController from '../common/baseController';
import UserController from './userControllers';


@injectable()
export default class ApplicationRouter {
  @inject(TYPES.UserController) private userController: UserController;

 
  private getController(context: BaseController, func: string) {
    if (!(func in context)) {
        throw new Error(`Method '${func}' does not exist on the '${context.constructor.name}' object.`);
    }
    return asyncWrap(context[func].bind(context));
  }

  public register(app: Application) {
    app.get('/users', this.getController(this.userController, 'getAll'));
    app.get('/users/:id', this.getController(this.userController, 'get'));
    app.post('/users', this.getController(this.userController, 'create'));
  }
}