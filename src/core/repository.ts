import { Entity, EntityId, Repository} from 'redis-om';
import { decorate, injectable } from 'inversify';


decorate(injectable(), Repository);


@injectable()

export default abstract class CommunRepository extends Repository {

   

    public async findById(repository:Repository, id:string) {
        return await repository.fetch(id);
    }

    public async findOne(repository:Repository, filter:any){
        return await repository.search().where(filter.name).contains(filter.value).return.first();
    }

    public async find(repository:Repository, filter:any) {
        return await repository.search().where(filter.name).contains(filter.value).returnAll()
    }

    public async all(repository:Repository){
        return await repository.search().returnAll();
    }

    public async deleteById(repository:Repository, id:string){
        await repository.remove(id);
    }

    public async removeMany(repository:Repository, filter:any) {
        const ids = await repository.search().where(filter.name).contains(filter.value).return.allIds();
        await repository.remove(...ids)
    }

    public async countAll(repository:Repository){
        return await repository.search().return.count();
    }

    public async countBy(repository:Repository, filter:any){
        return await repository.search().where(filter.name).contains(filter.value).return.count();
    }

    public async create(repository:Repository, data: any): Promise<string | undefined> {
        if (!data) {
            throw new Error('Empty object provided');
        }
    
        const entity = await repository.save(data)
        return entity[EntityId];
    }
}