

import { isValidID } from "../config/mongoose.config.js";
import productModel from "../models/product.model.js";
import { convertToBool } from "../utils/converter.js"
import ErrorManager from "./ErrorManager.js";


export default class ProductManager {
    #productModel;
    constructor() {
        this.#productModel = productModel;
    }
    // metodos

    async #findOneById(id) {
        if(!isValidID(id)){
            throw ErrorManager("ID invalido",400);
        }

        const product = await this.#productModel.findById(id);
        if(!product){
            throw ErrorManager("ID no encontrado",404);
        }
        return product;
    }

    async getAll(params){
        try {
            const $and = [];
            
            if(params?.title) $and.push( {title:{$regex: params.title, $options:"i"} });
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { title: 1},
                desc: { title: -1},
            };

            const paginationOptions = {
                limit: params?.limit || 10, // el numero de documentos por defecto 
                page: params?.page || 1, // pagina actual por defecto,
                sort: sort[params?.sort] ?? {}, // Ordenamiento (sin orden por defecto)
                lean: true, // Convertir los resultados en objetos planos
            }

            return await this.#productModel.paginate(filters, paginationOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
    async getOneById(id) {

        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw ErrorManager.handleError(error)
        }
    }
    
    /**
     * @description Inserta un producto en la DB
     * @param {*} data 
     * @returns product
     */
    async insertOne(data) {
        try {
            const product = await this.#productModel.create({...data, status: convertToBool(data.status),})
            return product;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    /**
     * @description Actualiza un producto por su ID
     * @param {*} id 
     * @param {*} data 
     * @returns 
     */
    async updateOneById(id, data) {
        try {
            const product = await this.#findOneById(id)
            const newValues = {
                ...product,
                ...data,
                status: data.status ? convertToBool(data.status) : product.status,
            }
            product.set(newValues);
            product.save();

            return product;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    /**
     * @description Elimina un producto por su ID
     * @param {*} id 
     * @returns 
     */
    async deleteOneById(id) {
        try {
            const product = await this.#findOneById(id);
            await product.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

}