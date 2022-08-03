import VersionCompareService from "../../src/services/VersionCompareService";
import ChangeLogRequestDTO from "../../src/dtos/ChangeLogRequestDTO";

describe('testing versionCompareService file', () => {

  let requestChangeLog = new ChangeLogRequestDTO();
  requestChangeLog.urlOld = "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/1.0.2.yml";
  requestChangeLog.urlCurrent = "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/2.0.0.yml";

  test('Compare 2 file yaml', async () => {

    const versionCompareService = new VersionCompareService();
    let result = await versionCompareService.compareWithUrl(requestChangeLog);

    expect(result[2].description).toBe("'pagination-key' adicionado;")
    expect(result[2].endpoint).toBe( "resources/");

  });

  test('Compare 2 file yaml - unnaranged', async () => {

    const versionCompareService = new VersionCompareService();
    let result = await versionCompareService
        .compare("./tests/documents/resources/1.0.2.yml",
        "./tests/documents/resources/1.0.2 copy.yml");

    expect(result[1].description).toBe("'pagination-key' adicionado;")

    expect(result[1].endpoint).toBe("resources/");

  });

  test('Compare 2 url yaml - unnaranged', async () => {

    const versionCompareService = new VersionCompareService();

    let result = await versionCompareService.compareWithUrl(requestChangeLog);

    expect(result[0].endpoint).toBe("info")
  });

  test('Compare 2 file yaml - validation endPoint change', async () => {

    const versionCompareService = new VersionCompareService();
    
    let result = await versionCompareService
        .compare("./tests/documents/yaml-OpenAPI-EndPointChange/old.yaml",
        "./tests/documents/yaml-OpenAPI-EndPointChange/current.yaml");
   
        expect(result[0].description).toBe("'Accounts' adicionado;")
  });

});