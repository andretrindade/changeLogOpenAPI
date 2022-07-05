
import VersionCompareService from "../../src/services/VersionCompareService";
import YamlToObjectJsonService from "../../src/services/SwaggerPreparationDataService";

describe('testing versionCompareService file', () => {
  test('Compare 2 file yaml', async () => {

    const versionCompareService = new VersionCompareService();
    let result = await versionCompareService
        .compare("./tests/documents/yaml-OpenAPI/old.yaml",
        "./tests/documents/yaml-OpenAPI/current.yaml");

    expect(result['info'][0].description).toBe("Campo 'title' alterado de 'API CreditCard - Open Banking Brasil' para 'API Accounts - Open Banking Brasil'")
    expect(result['info'][0].path).toBe('info');

  });

  test('Compare 2 file yaml - validation endPoint change', async () => {

    const versionCompareService = new VersionCompareService();
    let result = await versionCompareService
        .compare("./tests/documents/yaml-OpenAPI-EndPointChange/old.yaml",
        "./tests/documents/yaml-OpenAPI-EndPointChange/current.yaml");
    expect(
      result["paths//accounts/{accountId}/overdraft-limits/"][0].description)
      .toBe("Campo 'Accounts' adicionado.")

  });

  // test('Compare 2 file json - validation endPoint (Lucas)', async () => {

  //   const versionCompareService = new VersionCompareService();
  //   let result = await versionCompareService
  //       .compare("./tests/documents/yaml-OpenAPI/dereferenced_files/old.json",
  //       "./tests/documents/yaml-OpenAPI/dereferenced_files/current.json");
  //   expect(
  //     result["paths//accounts/{accountId}/overdraft-limits/"][0].description)
  //     .toBe("Campo 'Accounts' adicionado.")

  // });
});