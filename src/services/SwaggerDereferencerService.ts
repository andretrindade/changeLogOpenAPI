
// @ts-ignore
import * as swaggerCli from "@apidevtools/swagger-cli"
export default class SwaggerDereferencerService {

    public static async dereference(file: String): Promise<any> {

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