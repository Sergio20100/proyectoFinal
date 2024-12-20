// import { generateId } from "../utils/collectionHandler.js";
// import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
// import paths from "../utils/paths.js";
import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js"
import CartModel from "../models/cart.model.js";

export default class CartManager{
    #cartModel;
    constructor(){
        this.#cartModel = CartModel;
    }
// metodos

    /**
     * @description Buscar un carrito por su ID
     * @param {*} id 
     * @returns cart found
     */
    async #findOneById(id){
       if(!isValidID(id)){
        throw new ErrorManager("ID Invalido",400);
       }
       // almaceno el carrito
       const cart = await this.#cartModel.findById(id).populate("carts.cart");

       if(!cart){
        throw new ErrorManager("ID no encontrado",404);
       }
       return cart;
    }
/** */
     // Obtiene un carrito específico por su ID
     async getOneById(id) {
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    /** 
     * @description Insertar un carrito en la DB
     * @param data
     * @returns cart
     */
    async insertOne(data){
        try {
            const cart = await this.#cartModel.create(data);
            return cart;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    /** 
     * @description Agrega un producto al carrito o incrementa la cantidad existente
     * @param {*} cartID
     * @param {*} productID  
     * @returns cart
     */
    async addProductById(cartID, productID){

        try {
            const cart = await this.#findOneById(cartID);
            const productIndex = cart.products.findIndex((item)=>item.product._id.toString()=== cartID);
            // si lo encuentro le sumo 1 sino lo agrego a la lista de productos del carrito
            productIndex >= 0 ? cart.products[productIndex].quantity++ : cart.products.push({product: productID, quantity: 1})
            
            await cart.save();

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
     }

    //  async deleteProductById(cartID, productID){

    //     try {
    //         const cartFound = await this.$findOneById(cartID);
    //         if(!cartFound){
    //             throw new ErrorManager("No se encontro el id del carrito",400);
    //             }
    //         const prouctFoundInCart = cartFound.products.findIndex((item)=> item.product === Number(productID) )

    //         // const productFound = await this.#productManager.$findOneById(productID);
    //         // if(!productFound){
    //         //     throw new ErrorManager("No se encontro el producto en la lista de productos",400);
    //         // }         
            
    //      if(prouctFoundInCart >= 0){
    //         const productRemoved = cartFound.products.splice(prouctFoundInCart,1);
    //         const index = this.#carts.findIndex((item)=>item.id === Number(cartFound.id));
    //         this.#carts[index] = cartFound;    
    //         await writeJsonFile(paths.files, this.#jsonFilename,this.#carts)
    //         return cartFound;
    //      }else{
    //         throw new ErrorManager("No se encontro el producto en la lista de productos del carrito",400);
    //      }
    //     } catch (error) {
    //      throw new ErrorManager(error.message, error.code);
    //     }
    //  }
    // async getAll(){
    //    try {
    //     this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
    //     return this.#carts;
    //    } catch (error) {
    //     throw new ErrorManager(error.message, error.code);
    //    }
    // }
   

    // async updateOneById(id, data){
    //    try {
    //     const { title, status, stock } = data;
    //     const cartFound = await this.$findOneById(id);

    //     const cart = {
    //         id: cartFound.id,
    //         title: title || cartFound.title,
    //         status: status ? convertToBool(status) : cartFound.status, 
    //         // este status viene como string por eso se valida asi
    //         stock: stock ? Number(stock) : cartFound.stock
    //     }
    //     const index = this.#carts.findIndex((item)=>item.id === Number(id));
    //     this.#carts[index] = cart;
    //     await writeJsonFile(paths.files, this.#jsonFilename,this.#carts)
    //     return cart;
    //    } catch (error) {
    //     throw new Error("Fallo al actualizar un cart ")
    //    }
    // }
    // async deleteOneById(id){
    //    try {
    //     await this.$findOneById(id);

    //     const index = this.#carts.findIndex((item)=>item.id === Number(id));
    //     this.#carts.splice(index,1);
    //     await writeJsonFile(paths.files, this.#jsonFilename,this.#carts)
    //     return cart;
    //    } catch (error) {
    //     throw new Error("Fallo al eliminar un cart ")
    //    }
    // }
    
}