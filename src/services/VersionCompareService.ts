import ChangeLogViewOutputDTO from "../dtos/ChangeLogViewOutputDTO";
import OpenAPIValidationHandler from "../validation/OpenAPIValidationHandler";
import ChangeLogService from "./ChangeLogService";
import DiffCheckerService from "./DiffCheckerService";
import FormattingChangeService from "./FormattingChangeService";
import SwaggerDereferencerService from "./SwaggerDereferencerService";
import SwaggerPreparationDataService from "./SwaggerPreparationDataService";
import UrlToFileYamlService from "./UrlToYaml";

export default class VersionCompareService {
    private _changeLogService: ChangeLogService;
    private _diffCheckerService: DiffCheckerService;
    private _formattingChangeService : FormattingChangeService;
    private _urlToFileYamlService : UrlToFileYamlService;

    constructor() {
        this._changeLogService = new ChangeLogService();
        this._diffCheckerService = new DiffCheckerService();
        this._formattingChangeService = new FormattingChangeService();
        this._urlToFileYamlService = new UrlToFileYamlService();
    }
    
    public async compareWithUrl(urlOld: string, urlCurrent: string): Promise<ChangeLogViewOutputDTO[]> {
        let fileOld = await  this._urlToFileYamlService.convertUrlToFileYaml(urlOld);
        let fileCurrent = await  this._urlToFileYamlService.convertUrlToFileYaml(urlCurrent);
        let changesView =  await this.compare(fileOld,fileCurrent);

        return changesView;
        
    }

    private async getChanges(fileOld : any, fileCurrent:any):Promise<ChangeLogViewOutputDTO[]>{
        
        let objOld = await  SwaggerDereferencerService.dereference(fileOld);
        let objCurrent = await SwaggerDereferencerService.dereference(fileCurrent);

        await  new OpenAPIValidationHandler().handleValidation(objOld, objCurrent)

        let objOldWithComponents =   SwaggerPreparationDataService.Prepare(objOld);
        let objCurrentWithComponents =   SwaggerPreparationDataService.Prepare(objCurrent);
        
        let changes = this._diffCheckerService.getChangeDiff(objOldWithComponents, objCurrentWithComponents);
        let changeLogs = this._changeLogService.getChangeLog(changes);
        
        let changesView = this._formattingChangeService.formatting(changeLogs);

        return changesView;
    }

    public async compare(fileOld: string, fileCurrent: string): Promise<ChangeLogViewOutputDTO[]> {
        let changesView =  await this.getChanges(fileOld,fileCurrent);

        return changesView;
    }

}