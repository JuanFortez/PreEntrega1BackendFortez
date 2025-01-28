import { Router } from "express";
import CartManager from "../service/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const carts = await cartManager.readFile(cartId);
    const newCart = {
      id: `${Date.now()}`,
      products: [],
    };
    carts.push(newCart);
    await cartManager.writeFile(cartId, carts);
    res
      .status(201)
      .json({ message: "Carrito creado correctamente", cart: newCart });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const carts = await cartManager.readFile();
    const cart = carts.find((c) => c.id === cid);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
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
    const carts = await cartManager.readFile();
    const cart = carts.find((c) => c.id === cid);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const productInCart = cart.products.find((p) => p.product === pid);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cartManager.writeFile(carts);
    res.json({ message: "Producto agregado al carrito", cart });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
