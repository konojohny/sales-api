import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

export default class ProductsController{
    public async index(req: Request, res: Response): Promise<Response>{
        const listProduct = new ListProductService();

        const product = await listProduct.execute();

        return res.json(product);
    }

    public async show(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const showProducts = new ShowProductService();

        const product = await showProducts.execute({ id });

        return res.json(product);
    }

    public async create(req: Request, res: Response): Promise<Response>{
        const { name, price, quantity } = req.body;

        const createProduct = new CreateProductService();

        const product  = await createProduct.execute({ name, price, quantity });

        return res.json(product);
    }

    public async update(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const { name, price, quantity } = req.body;

        const updateProduct  = new UpdateProductService();

        const product = await updateProduct.execute({ id, name, price, quantity });

        return res.json(product);
    }
    
    public async delete(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const deleteProduct = new DeleteProductService();

        await deleteProduct.execute({ id });

        return res.json([]);
    }
}