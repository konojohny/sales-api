import { getCustomRepository, getRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import usersRepository from "../typeorm/repositories/UserRepository";

interface IRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    public async execute({name, email, password}: IRequest): Promise<User | undefined>{
        const userRepository = getCustomRepository(usersRepository);
        const emailExists = await userRepository.findByEmail(email);

        if(emailExists){
            throw new AppError("Email address already used.");
        }

        const user = userRepository.create({
            name,
            email,
            password,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService