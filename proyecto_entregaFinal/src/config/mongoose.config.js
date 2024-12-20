import { connect, Types } from "mongoose"

export const connectDB = async () => {
    const URL = "mongodb+srv://coderhouse:coderhouse@clusterproyectofinalbac.ov588.mongodb.net/?retryWrites=true&w=majority&appName=ClusterProyectoFinalBackend1";

    try {
        await connect(URL);
        console.log("Conectado a Mongo Atlas");
        
    } catch (error) {
        console.log("Error al conectar con mongoDB", error.message);
    }
};

//funcion para verificar que un ID sea valido con el formato de ObjectID de mongo
export const isValidID = (id) =>{ 
    return Types.ObjectId.isValid(id); 
};