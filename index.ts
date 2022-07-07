// TODO - em construção. 
// Favor utilizar mecanismos de testes para validar aplicação. 
// npm test

import ChangeLogGeneratorService from "./src/services/ChangeLogGeneratorService";



let changeLogGeneratorService = new  ChangeLogGeneratorService();
let urlOld = "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/accounts/1.0.3.yml";
let urlCurrent = "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/accounts/2.0.0.yml";


changeLogGeneratorService.GenerateChangeLogWithUrlYaml(urlOld,urlCurrent);
