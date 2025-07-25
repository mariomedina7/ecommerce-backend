import ProductDAO from "./dao/product.dao.js"

const productDAO = new ProductDAO();

export default class ProductRepository {
    async getProducts(){
        return await productDAO.getProducts();
    }

    async createProduct(product) {
        return await productDAO.createProduct(product);
    }

    async getProductById(pid) {
        return await productDAO.getProductById(pid);
    }

    async updateProduct(pid, updateData) {
        return await productDAO.updateProduct(pid, updateData);
    }

    async deleteProduct(pid) {
        return await productDAO.deleteProduct(pid);
    }
}