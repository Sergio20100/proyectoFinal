import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";



// title,
// description,
// code,
// price: Number(price),
// status,
// stock: Number(stock),
// category,
// thumbnails: thumbnails || [],

// if (
//     !title ||
//     !description ||
//     !code ||
//     !price ||
//     !status ||
//     !stock ||
//     !category
// ) {
//     throw new ErrorManager("faltan datos obligatrios", 400);
// }
const productSchema = new Schema({
    title: {
        index: { name: "idx_title" },
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 25 caracteres" ],
    },
    description: {
        // index: { name: "idx_description" },
        type: String,
        required: [ true, "La descripcion es obligatoria" ],
        uppercase: false,
        trim: true,
        minLength: [ 3, "La descripcion debe tener al menos 3 caracteres" ],
        maxLength: [ 200, "La descripcion debe tener como máximo 200 caracteres" ],
    },
    code: {
        // index: { name: "idx_code" },
        type: String,
        required: [ true, "El codigo es obligatorio" ],
        uppercase: false,
        trim: true,
        minLength: [ 3, "El codigo debe tener al menos 3 caracteres" ],
        maxLength: [ 10, "El codigo debe tener como máximo 10 caracteres" ],
    },
    price: {
        type: Number,
        required: [ true, "El precio del producto es obligatorio" ],
        min: [ 0, "El price debe ser un valor positivo" ],
    },
    status: {
        type: Boolean,
        required: [ true, "El estado es obligatorio" ],
    },
    stock: {
        type: Number,
        required: [ true, "El stock es obligatorio" ],
        min: [ 0, "El stock debe ser un valor positivo" ],
    },
    category: {
        // index: { name: "idx_category" },
        type: String,
        required: [ true, "La categoria del producto es obligatoria" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "La categoria del producto debe tener al menos 3 caracteres" ],
        maxLength: [ 20, "La categoria del producto debe tener como máximo 20 caracteres" ],
    },
    thumbnail: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
productSchema.plugin(paginate);

const productModel = model("products", productSchema);

export default productModel;