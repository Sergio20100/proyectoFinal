import { Router } from "express";
// import uploader from "../utils/uploader.js";
import CartManager from "../managers/CartManager.js";
const router = Router();

const cartManager = new CartManager();

router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getAll();
        res.status(200).json({ status: "success", payload:carts });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.get("/:id", async (req, res) => {
    try {
        const cart = await cartManager.getOneById(req.params?.id);
        res.status(200).json({ status: "success", payload:cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.post("/", async (req, res) => {
    try {
        // console.log(req.body)
        const cart = await cartManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        // console.log(req.body)
        
        const cart = await cartManager.addProductById(req.params?.cid,req.params?.pid,req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});
router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const cart = await cartManager.deleteProductById(req.params?.cid,req.params?.pid);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

export default router;