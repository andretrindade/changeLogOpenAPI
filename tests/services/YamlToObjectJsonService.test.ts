
import YamlToObjectJsonService from "../../src/services/YamlToObjectJsonService";

describe('testing yamlToObjectJsonService file', () => {
  test('read yaml from file', () => {

    const changeLogService = new YamlToObjectJsonService();
    let result = changeLogService.convert("./documents/yaml-OpenAPI/teste.yaml");
    expect(result.components.parameters.accountId.name).toBe('accountId');


  });
});