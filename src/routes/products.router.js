import { Router } from "express";
import ProductManager from "../service/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getAllProducts(limit);
    res.status(200).json({ status: "Success", payload: products });
  } catch (error) {
    console.log("Error: ", error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !stock ||
      !category ||
      !thumbnails
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }
    const product = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    };
    const newProductId = await productManager.addProduct(product);
    res
      .status(201)
      .json({ id: newProductId, message: "Producto creado correctamente" });
  } catch (error) {
    console.log("Error: ", error);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updateProduct = await productManager.updateProduct(
      productId,
      req.body
    );
    if (updateProduct) {
      res.json(updateProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const deletedProduct = await productManager.updateProduct(productId);
    if (deletedProduct) {
      res.json({ message: "Producto eliminado correctamente", product: deletedProduct });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
