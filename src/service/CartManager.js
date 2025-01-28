import fs from "fs/promises";
import path from "path";

const pathCart = path.resolve("db", "cart.json");

export default class CartManager {
  // Constructor
  constructor() {
    this.cart = [];
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(pathCart, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.cart = [];
    }
  }
}
