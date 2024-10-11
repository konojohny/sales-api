import { getCustomRepository, getRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface Irequest{
    id: string;
}

class DeleteProductService{
    public async execute({id}: Irequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);

        if(!product){
            throw new AppError("Product not found.");
        }

        await productsRepository.remove(product);
    }
}

export default DeleteProductService