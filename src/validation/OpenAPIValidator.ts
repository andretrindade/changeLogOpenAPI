import SwaggerParser from '@apidevtools/swagger-parser'

export default class OpenAPIValidator {

    public async isValidOpenAPIFormat(api: string) {

        try {
            await SwaggerParser.validate(api, { validate: { schema: false } });
            return true
        }
        catch (err) {
            return false;
        }
    }

    public isOpenAPIv3(openAPISpec: any): boolean {
        return openAPISpec.openapi === "3.0.0";
    }

    public hasValidVersionValues(oldSpec: any, currentSpec: any): boolean {

        let oldVersion = oldSpec.info.version
        let currentVersion = currentSpec.info.version

        oldVersion = oldVersion.substring(0, oldVersion.search(/[a-zA-Z]/)).replace(/\D/g, "") || oldVersion.replace(/\D/g, "")
        currentVersion = currentVersion.substring(0, currentVersion.search(/[a-zA-Z]/)).replace(/\D/g, "") || currentVersion.replace(/\D/g, "")


        if (Number(oldVersion) < Number(currentVersion)) {
            return true
        }
        if (Number(oldVersion) > Number(currentVersion)) {
            return false
        }

        return this.isValidComparingReleaseCadidateValues(oldSpec.info.version, currentSpec.info.version)
    }

    private isValidComparingReleaseCadidateValues(oldVersion: string, currentVersion: string): boolean {

        oldVersion = oldVersion.replace(/\D/g, "")
        currentVersion = currentVersion.replace(/\D/g, "")


        if (oldVersion.length > currentVersion.length) {
            let diff = oldVersion.length - currentVersion.length

            for (let i = 0; i < diff; i++) {
                currentVersion += "9"
            }
        } else if (oldVersion.length < currentVersion.length) {
            let diff = currentVersion.length - oldVersion.length
            for (let i = 0; i < diff; i++) {
                oldVersion += "9"
            }
        }

        return Number(currentVersion) > Number(oldVersion);
    }
}