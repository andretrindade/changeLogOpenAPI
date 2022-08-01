export default class NamesApiFromUrlExtensionService{
    static getNameApiWithVersionFromUrl(url :string): String {
        let fileNameApi = this.getApiNameFromUrl(url);
        let nameVersionOld = this.getVersionNameWithExtensionFileFromUrl(url);
        let nameApiWithVersion = `${fileNameApi}/${nameVersionOld}`
        return nameApiWithVersion
    }
    public static getVersionNameWithExtensionFileFromUrl(url:string):String{
        let urlTemp = url.split("/")
        let apiName  = urlTemp.pop();
 
        return apiName || "";
    }

    public static getVersionNameFromUrl(url:string):String{
        let urlTemp = url.split("/")
        let apiName  = (urlTemp.pop() || "").replace(".yml", "");
 
        return apiName;
    }

    public static getApiNameFromUrl(url:string):String{
       let urlTemp = url.split("/")
       urlTemp.pop();
       let apiName  = urlTemp.pop();

       return apiName || "";
    }

    public static getOutputWithApiAndVersion(urlOld: string, urlCurrent: string):String{
        let fileNameApi = this.getApiNameFromUrl(urlOld);
        let nameVersionOld = this.getVersionNameFromUrl(urlOld);
        let nameVersionCurrent = this.getVersionNameFromUrl(urlCurrent);

        let fullName = `output/${fileNameApi}/${nameVersionOld}_${nameVersionCurrent}`

        return fullName;
    }

}