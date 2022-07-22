import NamesApiFromUrlExtensionService from "./NamesApiFromUrlExtensionService";
import SheetGeneratorService from "./SheetGeneratorService";
import VersionCompareService from "./VersionCompareService";

export default class ChangeLogGeneratorService {
    private _versionCompareService: VersionCompareService;
    private _sheetGeneratorService: SheetGeneratorService;
    constructor() {
        this._versionCompareService = new VersionCompareService();
        this._sheetGeneratorService = new SheetGeneratorService();
    }

    public async GenerateChangeLogWithUrlYaml(urlOld: string, urlCurrent: string): Promise<any> {

        let changeLogViewOutputList = await this._versionCompareService.compareWithUrl(urlOld, urlCurrent);
        let pathFileName = NamesApiFromUrlExtensionService.getOutputWithApiAndVersion(urlOld,urlCurrent);
        let nameApi = NamesApiFromUrlExtensionService.getApiNameFromUrl(urlOld);
        let nameFile = `${pathFileName}/${nameApi}_`;
        let fileNameChangeLog = this._sheetGeneratorService.generate(changeLogViewOutputList, nameFile);
        
        return {changesLog : changeLogViewOutputList, fileFullName : fileNameChangeLog};
    }

    
}