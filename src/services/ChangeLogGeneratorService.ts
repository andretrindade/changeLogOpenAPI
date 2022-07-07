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
        let fileNameApi = this.getApiNameFromUrl(urlOld);

        let fileNameChangeLog = this._sheetGeneratorService.generate(changeLogViewOutputList, `output/${fileNameApi}/${fileNameApi}_`);
        
        return {changesLog : changeLogViewOutputList, fileFullName : fileNameChangeLog};
    }

    public getApiNameFromUrl(url:string):String{
       let urlTemp = url.split("/")
       urlTemp.pop();
       let apiName  = urlTemp.pop();

       return apiName;
    }
}