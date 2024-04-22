import { Container } from 'inversify';
import TYPES from '../user/types';
import UserService from '../user/userServices';
import UserRepository from '../user/userRepository';
import ApplicationRouter from '../user/userRoutes';
import UserController from '../user/userRepository';
import IUserService from '../user/userServiceInterface';

const container = new Container({ defaultScope: 'Singleton', skipBaseClassChecks: true });

container.bind(ApplicationRouter).to(ApplicationRouter);

container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);

export default container;