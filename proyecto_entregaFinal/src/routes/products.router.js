import { Router } from "express";
// import uploader from "../utils/uploader.js";
import ProductManager from "../managers/ProductManager.js";
const router = Router();

const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getAll(req.query);
        
        const jsonResponse = { 
                              status: "success", 
                              payload:products.docs,
                              limit: products.limit,
                              totalPages: products.totalPages,
                              prevPage: products.prevPage,
                              nextPage: products.nextPage,
                              page: products.page,
                              hasNextPage: products.hasNextPage,
                              hasPrevPage: products.hasNextPage,

                            }
        res.status(200).json(jsonResponse);
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const product = await productManager.getOneById(req.params?.pid);
        res.status(200).json({ status: "success", payload:product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.post("/", async (req, res) => {
    try {
        // console.log(req.body)
        const product = await productManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.put("/:pid", async (req, res) => {
    try {
        // console.log(req.params);
        
        const product = await productManager.updateOneById(req.params?.pid, req.body);
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const product = await productManager.deleteOneById(req.params?.pid);
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});


export default router;