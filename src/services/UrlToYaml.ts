import axios from 'axios';
import * as fs from 'fs';
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
        let fileFullName = ""

        let urlWithSplit = url.split("/");
        let fileName = urlWithSplit.pop();
        
        let path = `output/${urlWithSplit.pop()}`;
        fileFullName = `${path}/${fileName}`;
        try {
            if (!fs.existsSync("output")) {
                fs.mkdirSync("output");
            }
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }

            fs.writeFileSync(fileFullName, data)
        } catch (exception) {
            process.stderr.write(`ERROR received - ConvertUrlToFileYaml: ${exception}\n`);
        }
        return fileFullName;
    }
}