import { UserCreateDto } from './userDto';
import { UserDocument } from './userRepository';
// import { Entity } from 'redis-om';

interface IUserService {
    create(data: UserCreateDto): Promise<void>;
    getAll(): Promise<UserDocument[]>;
    get(id: string): Promise<UserDocument>;
}

export default IUserService;