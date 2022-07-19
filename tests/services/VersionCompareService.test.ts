
import VersionCompareService from "../../src/services/VersionCompareService";
import YamlToObjectJsonService from "../../src/services/SwaggerPreparationDataService";

describe('testing versionCompareService file', () => {
  test('Compare 2 file yaml', async () => {

    const versionCompareService = new VersionCompareService();
    let result = await versionCompareService
        .compareWithUrl("https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/1.0.2.yml",
        "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/2.0.0.yml");

    expect(result[2].resume).toBe("'pagination-key' adicionado;")
    expect(result[2].endpoint).toBe( "resources/");

  });

  test('Compare 2 file yaml - unnaranged', async () => {

    const versionCompareService = new VersionCompareService();
    let result = await versionCompareService
        .compare("./tests/documents/resources/1.0.2.yml",
        "./tests/documents/resources/1.0.2 copy.yml");

    expect(result[0].resume).toBe("'pagination-key' adicionado;")

    expect(result[0].endpoint).toBe("resources/");

  });

  test('Compare 2 url yaml - unnaranged', async () => {

    const versionCompareService = new VersionCompareService();
    let urlOld = "https://raw.githubusercontent.com/Sensedia/draft-openapi/GT-PR-F2/swagger-apis/resources/1.0.2.yml";
let urlCurrent = "https://raw.githubusercontent.com/Sensedia/draft-openapi/GT-PR-F2/swagger-apis/resources/2.0.0.yml";

    let result = await versionCompareService
        .compareWithUrl(urlOld,
          urlCurrent);

        expect(result[0].endpoint).toBe("info")

  });

  test('Compare 2 file yaml - validation endPoint change', async () => {

    const versionCompareService = new VersionCompareService();
    let result = await versionCompareService
        .compare("./tests/documents/yaml-OpenAPI-EndPointChange/old.yaml",
        "./tests/documents/yaml-OpenAPI-EndPointChange/current.yaml");
   
        expect(
      result[0].resume)
      .toBe("'Accounts' adicionado;")

  });
});