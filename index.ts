// TODO - em construção. 
// Favor utilizar mecanismos de testes para validar aplicação. 
// npm test

import ChangeLogGeneratorService from "./src/services/ChangeLogGeneratorService";



let changeLogGeneratorService = new  ChangeLogGeneratorService();
let urlOld = "https://raw.githubusercontent.com/Sensedia/draft-openapi/GT-PR-F2/swagger-apis/resources/1.0.2.yml";
let urlCurrent = "https://raw.githubusercontent.com/Sensedia/draft-openapi/GT-PR-F2/swagger-apis/resources/2.0.0.yml";


changeLogGeneratorService.GenerateChangeLogWithUrlYaml(urlOld,urlCurrent);
