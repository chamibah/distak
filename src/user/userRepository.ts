import { createClient } from 'redis'
import { injectable, inject } from 'inversify';
import { promisify } from 'util';
import CommunRepository from '../core/repository';
import  { Entity, EntityId } from 'redis-om';



export interface UserDocument {
	username: string;
	email: string;
	password: string;
	updatedAt?: Date;
	createdAt?: Date;
}
const client = createClient();

const getAsync = promisify(client.get).bind(client);

@injectable()
export default class UserRepository extends CommunRepository {

	public async isUsernameExists(username: string): Promise<boolean> {

		const user = await this.findOne(this, {name : 'username', value : username});

		return !!user;
	}

	public async isEmailExists(email: string): Promise<boolean> {

		const user = await this.findOne(this, {name : 'email', value : email});

		return !!user;
	}

  public async getAll(){
    return await this.search().returnAll();
  }


  public async get(id:string) {
    return await this.fetch(id);
  }

  public async create(data: any): Promise<string | undefined> {
    if (!data) {
        throw new Error('Empty object provided');
    }

    const entity = await this.save(data)
    return entity[EntityId];
}

}
