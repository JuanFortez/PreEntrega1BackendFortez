import fs from "fs/promises";
import path from "path";

const pathProducts = path.resolve("db", "products.json");

export default class ProductManager {
  constructor() {
    this.products = [];
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(pathProducts, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveToFile() {
    fs.writeFile(pathProducts, JSON.stringify(this.products, null, 2));
  }

  async getAllProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    }
    return this.products;
  }
  async getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  async addProduct(product) {
    const newProduct = {
      id: this.products.length
        ? this.products[this.products.length - 1].id + 1
        : 1,
      ...product,
      status: true,
    };
    this.products.push(newProduct);
    this.saveToFile();
    return newProduct.id;
  }

  async updateProduct(id, updateFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) return null;
    const updateProduct = {
      ...this.products[productIndex],
      id: this.products[productIndex].id,
    };
    this.products[productIndex] = updateProduct;
    this.saveToFile();
    return updateProduct;
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex((product = product.id === id));
    if (productIndex == -1) return null;
    const deletedProduct = this.products.splice(productIndex, 1);
    this.saveToFile();
    return deletedProduct[0];
  }
}
