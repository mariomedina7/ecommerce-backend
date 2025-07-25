import ProductService from "../services/product.service.js";

const productService = new ProductService();

export default class ProductController {
    async getProducts(req, res, next) {
        try{
            const products = await productService.getAllProducts();
            res.json({ status: 'success', products })
        } catch(error){
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);            
            res.json({ status: 'success', product });
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req, res, next) {
        try 
        {
            const { title, description, code, price, stock, category, thumbnails } = req.body;

            const product = { title, description, code, price, stock, category, thumbnails };
    
            const newProduct = await productService.createProduct(product);
    
            res.status(201).json({
                status: 'success',
                payload: newProduct,
                message: 'Producto creado exitosamente'
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try 
        {
            const { id } = req.params;
            const { title, description, code, price, stock, category, thumbnails } = req.body;

            const updateData = { title, description, code, price, stock, category, thumbnails };

            const updatedProduct = await productService.updateProduct(id, updateData);

            res.json({
                status: 'success',
                payload: updatedProduct,
                message: 'Producto actualizado exitosamente'
            });
        } catch (error) {
            next(error);
        } 
    }

    async deleteProduct(req, res, next) {
        try 
        {
            const { id } = req.params;             
            await productService.deleteProduct(id);

            res.json({
                status: 'success',
                message: 'Producto eliminado exitosamente'
            });      
        } catch (error) {
            next(error);
        } 
    }
}