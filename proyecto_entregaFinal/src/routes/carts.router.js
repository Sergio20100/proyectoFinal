import { Router } from "express";
// import uploader from "../utils/uploader.js";
import CartManager from "../managers/CartManager.js";
const router = Router();

const cartManager = new CartManager();

/**
 * @description Ruta para obtener todos los carritos
 */
router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getAll(req.query);
        res.status(200).json({ status: "success", payload:carts });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

/**
 * @description Ruta para obtener un carrito por ID
 */
router.get("/:id", async (req, res) => {
    try {
        const cart = await cartManager.getOneById(req.params?.id);
        res.status(200).json({ status: "success", payload:cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

/**
 * @description Ruta para agregar un carrito
 */
router.post("/", async (req, res) => {
    try {
        // console.log(req.body)
        const cart = await cartManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

/**
 * @description Ruta para incrementar en una unidad o agregar un producto específico en un carrito por su ID
 */
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        // console.log(req.body)
        const { cid, pid } = req.params;
        const cart = await cartManager.addProductById(cid,pid);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});
// router.delete("/:cid/product/:pid", async (req, res) => {
//     try {
//         const cart = await cartManager.deleteProductById(req.params?.cid,req.params?.pid);
//         res.status(201).json({ status: "success", payload: cart });
//     } catch (error) {
//         res.status(error.code || 500).json({status:"error", message: error.message})
//     }
// });

export default router;