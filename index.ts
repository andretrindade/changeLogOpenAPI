// TODO - em construção. 
// Favor utilizar mecanismos de testes para validar aplicação. 
// npm test

import ChangeLogGeneratorService from "./src/services/ChangeLogGeneratorService";
import apiFase2 from "./src/documents/ApiFase2.json"
let changeLogGeneratorService = new ChangeLogGeneratorService();


apiFase2.url

apiFase2.apis.forEach(api => {
    api.versoes.forEach(async x => {

        let urlOld = `${apiFase2.url}/${api.api}/${x.old}`;
        let urlCurrent = `${apiFase2.url}/${api.api}/${x.current}`;
        console.log(api.api)
        console.log(urlOld)
        console.log(urlCurrent)
        console.log("------")

        await changeLogGeneratorService.GenerateChangeLogWithUrlYaml(urlOld, urlCurrent);
    });
})
