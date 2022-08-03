import ValidationError from '../error/ValidationError';
import OpenAPIValidator from './OpenAPIValidator';

export default class OpenAPIValidationHandler {

    public async handleValidation(oldSpec: any, currentSpec: any) {

        const validator = new OpenAPIValidator();
        if (!validator.isOpenAPIv3(oldSpec) || !validator.isOpenAPIv3(currentSpec)) {
            throw new ValidationError("The specification provided it's not an OpenAPIv3 specification")
        }
        if (!(await validator.isValidOpenAPIFormat(oldSpec)) || !(await validator.isValidOpenAPIFormat(currentSpec))) {
            throw new ValidationError("The specification provided it's not valid")
        }
        if (!validator.hasValidVersionValues(oldSpec, currentSpec)) {
            throw new ValidationError("The old version of the specification is not inferior to the current version");
        }
    }
}
