import { Schema, Repository } from 'redis-om'
import { redis } from '../config/ConnectDb'

const userschema = new Schema('user', {
    name: { type: 'string' },   
    email: { type: 'string' },    
    password: { type: 'text' }      
})

export const userRepository = new Repository(userschema, redis);

(async () => {
    await userRepository.createIndex();
})();
