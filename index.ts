// TODO - em construção. 
// Favor utilizar mecanismos de testes para validar aplicação. 
// npm test

import SheetGeneratorService from "./src/services/SheetGeneratorService";
import VersionCompareService from "./src/services/VersionCompareService";


let fileOld = "./documents/unnaranged/1.0.4.yaml";
let fileCurrent = "./documents/unnaranged/2.0.0.yaml";

const versionCompareService = new VersionCompareService();
let result = versionCompareService
    .compare(fileOld,fileCurrent);

result.then(value => new SheetGeneratorService().generate(value, "changelog"))
result.then(value => console.log(value));
