import fs from "fs"
import path from "path";

const validatePathAndName = (filePath, fileName)=>{
    if(!filePath) throw new Error("la ruta del archivo no fue proporcionada");
    if(!fileName) throw new Error("el nombre del archivo no fue proporcionada");
}

export const readJsonFile = async (filePath, fileName) => {
    validatePathAndName(filePath, fileName);

    try {
        const content = await fs.promises.readFile(path.join(filePath, fileName),"utf8" );
        return JSON.parse(content || "[]" );
    } catch (error) {
        throw new Error("Error al leer el archivo")
    }
}
export const writeJsonFile = async (filePath, fileName,content) => {
    validatePathAndName(filePath, fileName);
    if(!content) throw new Error("el contenido no fue proporcionado")
    try {
        await fs.promises.writeFile(path.join(filePath, fileName), JSON.stringify(content,null,"\t"),"utf8" );
        
    } catch (error) {
        throw new Error("Error al escribir el archivo")
    }
}