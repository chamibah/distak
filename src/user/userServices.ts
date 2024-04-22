/*import { injectable, inject } from 'inversify';

import bcrypt from 'bcrypt';
import { MissingFieldError, BadRequestError } from '../common/appErrors';
import Constants from '../common/constants';
import UserRepository from './userRepository';
import { UserCreateDto } from './userDto';
import { UserDocument } from '../user/userRepository';
import IUserService from './userServiceInterface';
import { isEmail, isLength } from 'validator';
import { Entity } from 'redis-om';


@injectable()
export default class UserService implements IUserService {
	private _userRepository: UserRepository;

	constructor(@inject(UserRepository) userRepository: UserRepository) {
		this._userRepository = userRepository;
	}

	public normalizeEmail(email: string): string {
		return email.toLowerCase();
	}

	private async isValidUsername(username: string): Promise<boolean> {
		const length = username.length;
		const validLength = length >= 4 && length <= 30;

		if (!validLength) {
			return false;
		}

		const isAvailable = await this.isUsernameAvailable(username);

		return isAvailable;
	}

	private async isUsernameAvailable(username: string): Promise<boolean> {
		return await this._userRepository.isUsernameExists(username);
	}

	private async hashPassword(password: string): Promise<string> {
		const normalizePassword = password.trim();
		const salt = await bcrypt.genSalt(5);
		const hash = await bcrypt.hash(normalizePassword, salt);
		return hash;
	}

	public async create(data: UserCreateDto): Promise<void> {
		if (!data.email || !data.username || !data.password) {
			throw new MissingFieldError('email, username, password');
		}

		if (!isEmail(data.email)) {
			throw new BadRequestError(Constants.INVALID_EMAIL);
		}

		if (!isLength(data.password.trim(), { min: 4, max: 20 })) {
			throw new BadRequestError(Constants.INVALID_PASSWORD);
		}

		const normalizedEmail = this.normalizeEmail(data.email);

		const isUsernameAvailable = await this.isValidUsername(data.username);
		if (!isUsernameAvailable) {
			throw new BadRequestError(Constants.USERNAME_NOT_AVAILABLE);
		}

		const users = await this._userRepository.find(this._userRepository, { name: data.username, value: normalizedEmail });

		users.forEach((user) => {
			if (user.email === normalizedEmail) {
				throw new BadRequestError(Constants.EMAIL_NOT_AVAILABLE);
			}

			if (user.username === data.username) {
				throw new BadRequestError(Constants.USERNAME_NOT_AVAILABLE);
			}
		});

		const password = await this.hashPassword(data.password);

		const userData: UserCreateDto = {
			username: data.username,
			email: normalizedEmail,
			password,
		};

		await this._userRepository.create(this._userRepository, userData);
	}

	public async get(id: string): Promise<UserDocument> {
		if (!id) {
			throw new MissingFieldError('id');
		}

		return await this._userRepository.findById(this._userRepository, id);
	}

	
	public async getAll(): Promise<UserDocument[]> {
		return await this._userRepository.all(this._userRepository);
	}

	/*public async castEntityToUserDocument(userObject: Entity|Entity[]) : {
		if(Array.isArray(userObject)){
			let user: UserDocument = {
				email:
			};
		}else{

		}
	}*/
	/*public async castEntityToUserDocument(entity: Entity | Entity[]): Promise<UserDocument[]|UserDocument> {
		
		if (Array.isArray(entity)) {

			return entity.map((e: Entity) => ({
				
				username: e.username,
				email: e.email,
				password: e.password,
				updatedAt: e.updatedAt, 
				createdAt: e.createdAt, 
				
			}));
		} 
		const entity: Entity = { username: "string", email: "date", password:"string" , updatedAt: new Date(), createdAt: new Date() };
const userDocument: UserDocument = castEntityToUserDocument(entity);
console.log(userDocument);
}*/
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import { injectable, inject } from 'inversify';
import TYPES from './types';
import IUserService from  './userServiceInterface';
import UserRepository, { UserDocument } from './userRepository';
import * as bcrypt from 'bcrypt';
import { BadRequestError, MissingFieldError } from '../common/appErrors';
import Constants from '../common/constants';
import { UserCreateDto } from './userDto';
import { Entity } from 'redis-om';

@injectable()
export default class UserService implements IUserService {
  @inject(TYPES.UserRepository) private _userRepository: UserRepository;

  public normalizeEmail(email: string): string {
    return email.toLowerCase();
  }

  private async isValidUsername(username: string): Promise<boolean> {
    const length = username.length;
    const validLength = length >= 4 && length <= 30;

    if (!validLength) {
      return false;
    }

    const isAvailable = await this.isUsernameAvailable(username);

    return isAvailable;
  }
  private async isUsernameAvailable(username: string): Promise<boolean> {
    const isExists = await this._userRepository.isUsernameExists(username);

    return isExists;
  }

  private async hashPassword(password: string): Promise<string> {
    const normalizePassword = password.trim();
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(normalizePassword, salt);
    return hash;
  }
  public async create(data: UserCreateDto): Promise<void> {
	if (!data.email || !data.username || !data.password) {
		throw new MissingFieldError('email, username, password');
	}

	if (!isEmail(data.email)) {
		throw new BadRequestError(Constants.INVALID_EMAIL);
	}

	if (!isLength(data.password.trim(), { min: 4, max: 20 })) {
		throw new BadRequestError(Constants.INVALID_PASSWORD);
	}

	const normalizedEmail = this.normalizeEmail(data.email);

	const isUsernameAvailable = await this.isValidUsername(data.username);
	if (!isUsernameAvailable) {
		throw new BadRequestError(Constants.USERNAME_NOT_AVAILABLE);
	}

	const users = await this._userRepository.find(this._userRepository, { name: data.username, value: normalizedEmail });

	users.forEach((user) => {
		if (user.email === normalizedEmail) {
			throw new BadRequestError(Constants.EMAIL_NOT_AVAILABLE);
		}

		if (user.username === data.username) {
			throw new BadRequestError(Constants.USERNAME_NOT_AVAILABLE);
		}
	});

}
/*public async get(id: string): Promise<UserDocument> {
		if (!id) {
			throw new MissingFieldError('id');
		}

		return await this._userRepository.findById(this._userRepository, id);
	} */

	public async get(id: string): Promise<UserDocument> {
		if (!id) {
			throw new MissingFieldError('id');
		}
	
		const entity = await this._userRepository.findById(this._userRepository, id);
		
		const userDocument: UserDocument = {
			...entity,
			username: 'string', 
			email: 'string', 
			password: 'string' 
		};
		return userDocument;
	}

	

	public async getAll(): Promise<UserDocument[]> {
		const entities: Entity[] = await this._userRepository.all(this._userRepository);
		
		const userDocuments: UserDocument[] = entities.map(entity => {
			const userDocument: UserDocument = {
				...entity,
				username: 'string', 
				email: 'string', 
				password: 'string' 
			};
			return userDocument; 
		});
		
		return userDocuments;
	}

}