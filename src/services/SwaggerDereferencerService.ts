
import * as swaggerCli from "@apidevtools/swagger-cli"

export default class SwaggerDereferencerService {

    /**
     * @param files Lista de arquivos para serem desreferenciados
     * @param outputType Formato de saída, pode ser json ou yaml
     */
    public static dereferenceFiles(files: String[], outputType: String): void {

        files.forEach(file => {

            const filePath = file.slice(0, file.lastIndexOf("/"))

            outputType = outputType == "yaml" ? "yaml" : "json"
            const fileName = file.slice(file.lastIndexOf("/") + 1, file.length - 5)

            const outputFilePath = filePath + "/dereferenced_files/" + fileName + "." + outputType

            swaggerCli.bundle(file, { dereference: true, outfile: outputFilePath, type: outputType })
        });
    }
}