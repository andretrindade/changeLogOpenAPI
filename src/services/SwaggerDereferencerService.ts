
import * as swaggerCli from "@apidevtools/swagger-cli"

export default class SwaggerDereferencerService {

    /**
     * @param files Lista de arquivos para serem desreferenciados
     */
    public static async dereferenceFile(file: String): Promise<any> {

        const filePath = file.slice(0, file.lastIndexOf("/"))

        const fileName = file.slice(file.lastIndexOf("/") + 1, file.length - 5)

        let objJson = {}
        try {
            const objStringJson = await swaggerCli.bundle(file, { dereference: true, type: "json" })
            objJson = JSON.parse(objStringJson);
        } catch (error) {
            console.log(error)
        }

        return objJson;
    }
}