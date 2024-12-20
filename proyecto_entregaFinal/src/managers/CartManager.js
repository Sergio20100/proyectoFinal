import { generateId } from "../utils/collectionHandler.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import paths from "../utils/paths.js";
import ErrorManager from "./ErrorManager.js";
import ProductManager from "./ProductManager.js";

export default class CartManager{
    #jsonFilename;
    #carts = [];
    constructor(){
        this.#jsonFilename = "carrito.json";
    }
// metodos

    async $findOneById(id){
       
        this.#carts = await this.getAll();
        const cartFound = this.#carts.find((item)=>item.id === Number(id))
        if(!cartFound){
            throw new ErrorManager("Id del carrito no encontrado",404);
        }else{
            return cartFound
        }
    }
    async getOneById(id){
    
        try {
         const cartFound = await this.$findOneById(id);
         return cartFound;
        } catch (error) {
         throw new ErrorManager(error.message, error.code);
        }
     }
    async addProductById(cartID, productID){

        try {
            
            const cartFound = await this.$findOneById(cartID);
            if(!cartFound){
                throw new ErrorManager("No se encontro el id del carrito",400);
                }
         const prouctFoundInCart = cartFound.products.findIndex((item)=> item.product === Number(productID) )
            // if(productIndexFound < 0){
            //     throw new ErrorManager("No se encontro el producto en la lista de productos",400);
            // }
        //  console.log(cartFound);
         
         if(prouctFoundInCart >= 0){
            cartFound.products[prouctFoundInCart].quantity++;
         } else{
            cartFound.products.push({product: Number(productID), quantity: 1});
         }
         // utilizar funcion update
         
         const index = this.#carts.findIndex((item)=>item.id === Number(cartID));
         this.#carts[index] = cartFound;    
         await writeJsonFile(paths.files, this.#jsonFilename,this.#carts)
         return cartFound;
        } catch (error) {
         throw new ErrorManager(error.message, error.code);
        }
     }

     async deleteProductById(cartID, productID){

        try {
            const cartFound = await this.$findOneById(cartID);
            if(!cartFound){
                throw new ErrorManager("No se encontro el id del carrito",400);
                }
            const prouctFoundInCart = cartFound.products.findIndex((item)=> item.product === Number(productID) )

            // const productFound = await this.#productManager.$findOneById(productID);
            // if(!productFound){
            //     throw new ErrorManager("No se encontro el producto en la lista de productos",400);
            // }         
            
         if(prouctFoundInCart >= 0){
            const productRemoved = cartFound.products.splice(prouctFoundInCart,1);
            const index = this.#carts.findIndex((item)=>item.id === Number(cartFound.id));
            this.#carts[index] = cartFound;    
            await writeJsonFile(paths.files, this.#jsonFilename,this.#carts)
            return cartFound;
         }else{
            throw new ErrorManager("No se encontro el producto en la lista de productos del carrito",400);
         }
        } catch (error) {
         throw new ErrorManager(error.message, error.code);
        }
     }
    async getAll(){
       try {
        this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
        return this.#carts;
       } catch (error) {
        throw new ErrorManager(error.message, error.code);
       }
    }
   
    async insertOne(data){
       try {
        const products = data?.products?.map((item)=>{
            return {product: Number(item.product), quantity: 1}
        })
        const cart = {
            id: generateId( await this.getAll() ),
            // title,
            products: products || [],
        }
        this.#carts.push(cart);
        await writeJsonFile(paths.files, this.#jsonFilename,this.#carts)
        return cart;
       } catch (error) {
        throw new ErrorManager(error.message, error.code);
       }
    }

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