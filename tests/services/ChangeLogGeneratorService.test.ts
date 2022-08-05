
import ChangeLogGeneratorService from "../../src/services/ChangeLogGeneratorService";
import ChangeLogRequestDTO from '../../src/dtos/ChangeLogRequestDTO';

describe('testing ChangeLogGeneratorService file', () => {
  test('Should generate changeLog ', async () => {

    
    let changeLogGeneratorService = new  ChangeLogGeneratorService();
    let urlOld = "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/1.0.2.yml";
    let urlCurrent = "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/2.0.0.yml";

    let requestChangeLog = new ChangeLogRequestDTO();
    requestChangeLog.urlOld = urlOld;
    requestChangeLog.urlCurrent = urlCurrent;

    let result = await changeLogGeneratorService.GenerateChangeLogWithUrlYaml(requestChangeLog);

    expect(result.changesLog).toBeInstanceOf(Array)
    expect(result.changesLog[0].field).toBe("description")
    expect(result.changesLog[0].description).toBe("'description' alterado;")

  });
});