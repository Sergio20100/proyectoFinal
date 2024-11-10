import { generateId } from "../utils/collectionHandler.js";
import { convertToBool } from "../utils/converter.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import paths from "../utils/paths.js";
import ErrorManager from "./ErrorManager.js";
export default class ProductManager {
    #jsonFilename;
    #products = [];
    constructor() {
        this.#jsonFilename = "productos.json";
    }
    // metodos

    async $findOneById(id) {
        this.#products = await this.getAll();
        const productFound = this.#products.find((item) => item.id === Number(id))

        if (!productFound) {
            throw new ErrorManager("Id del producto no encontrado", 404);
        } else {
            return productFound
        }
    }
    async getOneById(id) {

        try {
            const productFound = await this.$findOneById(id);
            return productFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }
    async getAll() {
        try {
            this.#products = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#products;
        } catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }

    async insertOne(data) {
        try {
            const {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails,
            } = data;

            if (
                !title ||
                !description ||
                !code ||
                !price ||
                !status ||
                !stock ||
                !category ||
                !thumbnails
            ) {
                throw new ErrorManager("faltan datos obligatrios", 400);
            }

            const product = {
                id: generateId(await this.getAll()),
                title,
                description,
                code,
                price: Number(price),
                status,
                stock: Number(stock),
                category,
                thumbnails, // array de strings que contenga las rutas donde estan almacenadas las imagenes del producto

            }
            this.#products.push(product);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products)
            return product;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async updateOneById(id, data) {
        try {
            const {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails,
            } = data;
            if(!Array.isArray(thumbnails)){
                throw new ErrorManager("las imagenes no son un array",400)
            }
            const productFound = await this.$findOneById(id);

            const product = {
                id: productFound.id,
                title: title || productFound.title,
                description: description || productFound.description,
                code: code || productFound.code,
                price: price ? Number(price) : productFound.price,
                status:  status ? convertToBool(status) : productFound.status,
                // este status viene como string por eso se valida asi
                stock: stock ? Number(stock) : productFound.stock,
                category: category || productFound.category,
                // array de strings que contenga las rutas donde estan almacenadas las imagenes del producto
                thumbnails
            }
            const index = this.#products.findIndex((item) => item.id === Number(id));
            this.#products[index] = product;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products)
            return product;
        } catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }
    async deleteOneById(id) {
        try {
            const product = await this.$findOneById(id);
            // NO SIEMPRE ES NECESARIO RETORNAR EL ELEMENTO ELIMINADO 
            const index = this.#products.findIndex((item) => item.id === Number(id));
            this.#products.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products)
            return product;
        } catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }

}