import ChangeLogRequestDTO from "src/dtos/ChangeLogRequestDTO";
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

    public async GenerateChangeLogWithUrlYaml(request: ChangeLogRequestDTO): Promise<any> {

        const { urlOld, urlCurrent } = request;

        let changeLogViewOutputList = await this._versionCompareService.compareWithUrl(request);
        let pathFileName = NamesApiFromUrlExtensionService.getOutputWithApiAndVersion(urlOld, urlCurrent);
        let nameApi = NamesApiFromUrlExtensionService.getApiNameFromUrl(urlOld);
        let nameFile = `${pathFileName}/${nameApi}_`;
       // let fileNameChangeLog = this._sheetGeneratorService.generate(changeLogViewOutputList, nameFile);
        
        return {changesLog : changeLogViewOutputList};
    }

    
}