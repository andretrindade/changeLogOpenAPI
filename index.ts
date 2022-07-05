// TODO - em construção. 
// Favor utilizar mecanismos de testes para validar aplicação. 
// npm test

import SheetGeneratorService from "./src/services/SheetGeneratorService";
import VersionCompareService from "./src/services/VersionCompareService";


let fileOld = "./tests/documents/yaml-OpenAPI/dereferenced_files/old.json";
let fileCurrent = "./tests/documents/yaml-OpenAPI/dereferenced_files/current.json";

const versionCompareService = new VersionCompareService();
let result = versionCompareService
    .compare(fileOld,fileCurrent);

result.then(value => new SheetGeneratorService().generate(value, "changelog"))
result.then(value => console.log(value));
