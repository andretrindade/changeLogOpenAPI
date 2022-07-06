
import * as swaggerCli from "@apidevtools/swagger-cli"

export default class SwaggerDereferencerService {

    /**
     * @param files Lista de arquivos para serem desreferenciados
     */
    public static async dereferenceFile(file: String): Promise<any> {

        let objJson = {}
        try {
            const filePath = file.slice(0, file.lastIndexOf("/"))
            const fileName = file.slice(file.lastIndexOf("/") + 1, file.length - 5)
            const outputFilePath = filePath + "/dereferenced_files/" + fileName + ".yaml" 
           // await swaggerCli.bundle(file, { dereference: true, outfile: outputFilePath, type: "yaml" })
            const objStringJson = await swaggerCli.bundle(file, { dereference: true, type: "json" })
            objJson = JSON.parse(objStringJson);
        } catch (error) {
            console.log(error)
        }

        return objJson;
    }
}