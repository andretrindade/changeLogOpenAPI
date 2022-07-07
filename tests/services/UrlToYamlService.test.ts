
import UrlToFileYamlService from "../../src/services/UrlToYaml";

describe('testing UrlToYamlService file', () => {
  test('convert URL to file yaml', async () => {

    let urlYamlService = new UrlToFileYamlService();
    let url = "https://raw.githubusercontent.com/Sensedia/draft-openapi/GT-PR-F2/swagger-apis/financings/2.0.0.yml"
    let objResult  =await urlYamlService.convertUrlToFileYaml(url);

    expect(objResult).toBe('output/financings/2.0.0.yml');
  });

  test('get data from URL ', async () => {

    let urlYamlService = new UrlToFileYamlService();
    let url = "https://raw.githubusercontent.com/Sensedia/draft-openapi/GT-PR-F2/swagger-apis/financings/2.0.0.yml"
    let data  =await urlYamlService.getDataYamlFromUrl(url);
    expect(data[0]).toBe("o");

  });
});