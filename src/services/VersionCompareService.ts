import ChangeLogDTO from "../dtos/ChangeLogDTO";
import ChangeLogService from "./ChangeLogService";
import DiffCheckerService from "./DiffCheckerService";
import SwaggerDereferencerService from "./SwaggerDereferencerService";
import SwaggerPreparationDataService from "./SwaggerPreparationDataService";
import YamlToObjectJsonService from "./SwaggerPreparationDataService";

export default class VersionCompareService {
    private _changeLogService: ChangeLogService;
    private _diffCheckerService: DiffCheckerService;
    private _yamlToObjectJsonService: YamlToObjectJsonService;

    /**
     *
     */
    constructor() {
        this._changeLogService = new ChangeLogService();
        this._diffCheckerService = new DiffCheckerService();
        this._yamlToObjectJsonService = new YamlToObjectJsonService();;
    }
    
    public async compare(fileOld: string, fileCurrent: string):Promise<ChangeLogDTO[]> {

        let objOld = await  SwaggerDereferencerService.dereferenceFile(fileOld);
        let objCurrent = await SwaggerDereferencerService.dereferenceFile(fileCurrent);

        let objOldWithComponents =   SwaggerPreparationDataService.Prepare(objOld);
        let objCurrentWithComponents =   SwaggerPreparationDataService.Prepare(objCurrent);
        
        let changes = this._diffCheckerService.getChangeDiff(objOldWithComponents, objCurrentWithComponents);
        let changeLogs = this._changeLogService.getChangeLog(changes);
        
        return changeLogs;
    }

}