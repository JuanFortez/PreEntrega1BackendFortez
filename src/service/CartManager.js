import fs from "fs/promises";
import path from "path";

const pathCart = path.resolve("db", "cart.json");

export default class CartManager {
  constructor() {
    this.cart = [];
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(pathCart, "utf8");
      this.cart = JSON.parse(data);
    } catch (error) {
      this.cart = [];
    }
  }

  async saveToFile() {
    await fs.writeFile(pathCart, JSON.stringify(this.cart, null, 2));
  }

  async getAllCarts() {
    return this.cart;
  }

  async getCartById(id) {
    return this.cart.find((cart) => cart.id === id);
  }

  async addCart() {
    const newCart = {
      id: this.cart.length ? this.cart[this.cart.length - 1].id + 1 : 1,
      products: [],
    };
    this.cart.push(newCart);
    await this.saveToFile();
    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (!cart) return null;

    const productInCart = cart.products.find((p) => p.product === productId);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    await this.saveToFile();
    return cart;
  }
}
