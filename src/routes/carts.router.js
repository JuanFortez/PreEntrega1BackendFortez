import { Router } from "express";
import CartManager from "../service/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.addCart();
    res.status(201).json({ message: "Carrito creado correctamente", cart: newCart });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(cart.products);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid));
    if (!updatedCart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json({ message: "Producto agregado al carrito", updatedCart });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;