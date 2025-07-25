import ProductRepository from "../repositories/product.repository.js";
import { ApiError } from "../utils/apiError.js";

const productRepository = new ProductRepository();

export default class ProductService {
    async getAllProducts() {
        const products = await productRepository.getProducts();
        return products;
    }

    async createProduct(product) {
        const productCreated = await productRepository.createProduct(product);
        return productCreated;
   }

    async getProductById(pid) {
        const product = await productRepository.getProductById(pid);
        if(!product) throw new ApiError(404, 'Producto no encontrado');
        return product;
    }

    async updateProduct(pid, updateData) {
        await this.getProductById(pid);
        return await productRepository.updateProduct(pid, updateData);
    }

    async deleteProduct(pid) {
        await this.getProductById(pid);
        return await productRepository.deleteProduct(pid);
    }
}