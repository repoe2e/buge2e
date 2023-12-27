import { Request, Response } from 'express';
import { ListCategoryService } from '../../services/category/ListCategoryService';

class ListCategoryController {
    async handle(req: Request, res: Response) {
        const listCategoryService = new ListCategoryService();

        try {
            const categories = await listCategoryService.execute();
            return res.json(categories);
        } catch (error) {
            console.error("Erro ao listar categorias:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

export { ListCategoryController };
