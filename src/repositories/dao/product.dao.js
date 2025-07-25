import productModel from "../../models/productModel.js"; 

export default class ProductDAO {
    async getProducts(){
        return await productModel.find();
    }

    async createProduct(product) {
        return await productModel.create(product);
    }

    async getProductById(pid) {
        return await productModel.findById(pid);
    }

    async updateProduct(pid, updateData) {
        return await productModel.findByIdAndUpdate(pid, updateData, { new: true });
    }

    async deleteProduct(pid) {
        return await productModel.findByIdAndDelete(pid);
    }
}