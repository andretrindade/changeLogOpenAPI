import axios from 'axios';
import * as fs from 'fs';
import FileExtensionService from './FileExtensionService';
import NamesApiFromUrlExtensionService from './NamesApiFromUrlExtensionService';
export default class UrlToFileYamlService {

    public async getDataYamlFromUrl(url: string): Promise<string> {

        let data: string = "";
        try {
            const response = await axios.get(url);

            return response.data;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
        }

        return data;
    }

    public async convertUrlToFileYaml(url: string): Promise<string> {

        let data = ""
        data = await this.getDataYamlFromUrl(url);

        let fileFullName = `output/${NamesApiFromUrlExtensionService.getNameApiWithVersionFromUrl(url)}`

        FileExtensionService.CreateFolderByFullPath(fileFullName);
        try {
            fs.writeFileSync(fileFullName, data)
        } catch (exception) {
            process.stderr.write(`ERROR received - ConvertUrlToFileYaml: ${exception}\n`);
        }

        return fileFullName;
    }
}