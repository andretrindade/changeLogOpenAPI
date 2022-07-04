
import SwaggerDereferencerService from "../../src/services/SwaggerDereferencerService";
import * as fs from 'fs';

describe('testing dereferenced file generation', () => {
  test('should generate json file', () => {
    SwaggerDereferencerService.dereferenceFiles(["tests/documents/yaml-OpenAPI/current.yaml"], "json")
    setTimeout(() => {
      expect(fs.existsSync("tests/documents/yaml-OpenAPI/dereferenced_files/current.json")).toBe(true);
    },
      2000);
  });

  test('should generate yaml file', () => {
    jest.useFakeTimers();
    SwaggerDereferencerService.dereferenceFiles(["tests/documents/yaml-OpenAPI/current.yaml"], "yaml")
    setTimeout(() => {
      expect(fs.existsSync("tests/documents/yaml-OpenAPI/dereferenced_files/current.yaml")).toBe(true);
    },
      5000);
  });
});