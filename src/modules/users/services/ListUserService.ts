import { getCustomRepository, getRepository } from "typeorm";
import User from "../typeorm/entities/User";
import usersRepository from "../typeorm/repositories/UserRepository";

class ListUserService{
    public async execute(): Promise<User[]>{
        const userRepository = getCustomRepository(usersRepository);

        const users = userRepository.find();

        return users;
    }
}

export default ListUserService