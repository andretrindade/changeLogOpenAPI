import ChangeLogSeparatePerEndpointDTO from "../dtos/ChangeLogSeparatePerEndpointDTO";
import ChangeLogViewOutputDTO from "../dtos/ChangeLogViewOutputDTO";
import ChangeLogService from "./ChangeLogService";
import DiffCheckerService from "./DiffCheckerService";
import FormattingChangeService from "./FormattingChangeService";
import SwaggerDereferencerService from "./SwaggerDereferencerService";
import SwaggerPreparationDataService from "./SwaggerPreparationDataService";

export default class VersionCompareService {
    private _changeLogService: ChangeLogService;
    private _diffCheckerService: DiffCheckerService;
    private _formattingChangeService : FormattingChangeService;

    constructor() {
        this._changeLogService = new ChangeLogService();
        this._diffCheckerService = new DiffCheckerService();
        this._formattingChangeService = new FormattingChangeService();
    }
    
    public async compare(fileOld: string, fileCurrent: string): Promise<ChangeLogViewOutputDTO[]> {

        let objOld = await  SwaggerDereferencerService.dereferenceFile(fileOld);
        let objCurrent = await SwaggerDereferencerService.dereferenceFile(fileCurrent);

        let objOldWithComponents =   SwaggerPreparationDataService.Prepare(objOld);
        let objCurrentWithComponents =   SwaggerPreparationDataService.Prepare(objCurrent);
        
        let changes = this._diffCheckerService.getChangeDiff(objOldWithComponents, objCurrentWithComponents);
        let changeLogs = this._changeLogService.getChangeLog(changes);
        
        let changesView = this._formattingChangeService.formatting(changeLogs);

        return changesView;
    }

}