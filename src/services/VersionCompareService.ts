import ChangeLogDTO from "../dtos/ChangeLogDTO";
import ChangeLogService from "./ChangeLogService";
import DiffCheckerService from "./DiffCheckerService";
import YamlToObjectJsonService from "./YamlToObjectJsonService";

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
    
    public compare(fileOld: string, fileCurrent: string):ChangeLogDTO[] {
        let objOld = this._yamlToObjectJsonService.convert(fileOld);
        let objCurrent = this._yamlToObjectJsonService.convert(fileCurrent);

        let changes = this._diffCheckerService.getChangeDiff(objOld, objCurrent);

        let changeLogs = this._changeLogService.getChangeLog(changes);
        
        return changeLogs;
    }

}