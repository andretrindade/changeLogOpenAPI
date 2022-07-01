// TODO - em construção. 
// Favor utilizar mecanismos de testes para validar aplicação. 
// npm test

import VersionCompareService from "./src/services/VersionCompareService";


let fileOld = "./tests/documents/yaml-OpenAPI-EndPointChange/old.yaml";
let fileCurrent = "";


const versionCompareService = new VersionCompareService();
let result = versionCompareService
    .compare(fileOld,fileCurrent);

console.log(result);
