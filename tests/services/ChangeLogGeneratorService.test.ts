
import ChangeLogGeneratorService from "../../src/services/ChangeLogGeneratorService";
import SwaggerPreparationDataService from "../../src/services/SwaggerPreparationDataService";

describe('testing ChangeLogGeneratorService file', () => {
  test('Generate file changeLog ', async () => {

    
let changeLogGeneratorService = new  ChangeLogGeneratorService();
let urlOld = "https://raw.githubusercontent.com/Sensedia/draft-openapi/GT-PR-F2/swagger-apis/resources/1.0.2.yml";
let urlCurrent = "https://raw.githubusercontent.com/Sensedia/draft-openapi/GT-PR-F2/swagger-apis/resources/2.0.0.yml";


let result = await changeLogGeneratorService.GenerateChangeLogWithUrlYaml(urlOld,urlCurrent);

expect(result.fileFullName).toBe("output/resources/resources_changeLog.xlsx")


  });
});