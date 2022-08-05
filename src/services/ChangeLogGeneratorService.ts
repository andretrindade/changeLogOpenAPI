import ChangeLogRequestDTO from "src/dtos/ChangeLogRequestDTO";
import VersionCompareService from "./VersionCompareService";

export default class ChangeLogGeneratorService {
    private _versionCompareService: VersionCompareService;
    constructor() {
        this._versionCompareService = new VersionCompareService();
    }

    public async GenerateChangeLogWithUrlYaml(request: ChangeLogRequestDTO): Promise<any> {

        let changeLogViewOutputList = await this._versionCompareService.compareWithUrl(request);
        
        return {changesLog : changeLogViewOutputList};
    }

    
}