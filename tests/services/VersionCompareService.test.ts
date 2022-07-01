
import VersionCompareService from "../../src/services/VersionCompareService";
import YamlToObjectJsonService from "../../src/services/YamlToObjectJsonService";

describe('testing versionCompareService file', () => {
  test('Compare 2 file yaml', () => {

    const versionCompareService = new VersionCompareService();
    let result = versionCompareService
        .compare("./tests/documents/yaml-OpenAPI/old.yaml",
        "./tests/documents/yaml-OpenAPI/current.yaml");
    expect(result[0].description).toBe("Campo 'title' alterado de 'API CreditCard - Open Banking Brasil' para 'API Accounts - Open Banking Brasil'")
    expect(result[0].path).toBe('info');

  });

  test('Compare 2 file yaml - validation endPoint change', () => {

    const versionCompareService = new VersionCompareService();
    let result = versionCompareService
        .compare("./tests/documents/yaml-OpenAPI-EndPointChange/old.yaml",
        "./tests/documents/yaml-OpenAPI-EndPointChange/current.yaml");
    expect(result[0].description).toBe("Campo 'Accounts' adicionado.")

  });
});