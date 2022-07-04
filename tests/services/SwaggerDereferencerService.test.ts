
import SwaggerDereferencerService from "../../src/services/SwaggerDereferencerService";
import * as fs from 'fs';

describe('testing dereferenced file generation', () => {
  test('should generate json file', () => {
    let objResult = SwaggerDereferencerService.dereferenceFile("tests/documents/yaml-OpenAPI/current.yaml")
    objResult.then(x=>{
      expect(x).toBe(true);
    })
   
  });

  test('should generate yaml file', () => {
    jest.useFakeTimers();
    SwaggerDereferencerService.dereferenceFile("tests/documents/yaml-OpenAPI/current.yaml")
    setTimeout(() => {
      expect(fs.existsSync("tests/documents/yaml-OpenAPI/dereferenced_files/current.yaml")).toBe(true);
    },
      5000);
  });
});