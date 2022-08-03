import express, { Router } from 'express'
import ChangeLogRequestDTO from 'src/dtos/ChangeLogRequestDTO';
import HttpStatusCode from '../constants/HttpStatusCode';
import ChangeLogGeneratorService from "../services/ChangeLogGeneratorService";
import { RetornoRequest } from '../utils/retornoRequest';

class ChangeLogRoute {

    private readonly _changeLogGeneratorService !: ChangeLogGeneratorService

    constructor(changeLogGeneratorService: ChangeLogGeneratorService) {
      this._changeLogGeneratorService = changeLogGeneratorService;
    }
    

    public montaRotas(): Router {

        let router = express.Router();
        
        router.post('/generate-change-log', (request: any, response: any) => {

            this._changeLogGeneratorService.GenerateChangeLogWithUrlYaml(request.body).then(x => {
                return RetornoRequest.Response(x, null, response, HttpStatusCode.OK);
            }).catch(x => {
                return RetornoRequest.Response(null, x, response, HttpStatusCode.BAD_REQUEST);
            });
        });
     
        return router;
    }


}

export { ChangeLogRoute }