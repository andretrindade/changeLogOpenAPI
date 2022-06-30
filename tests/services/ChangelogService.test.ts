import { TypeChange } from "../../src/constants/Constant";
import ChangeDTO from "../../src/dtos/ChangeDTO";
import DictionaryDTO from "../../src/dtos/DictionaryDTO";
import ChangeLogService from "../../src/services/ChangeLogService";
import DiffChecker from "../../src/services/DiffChecker";

describe('testing changeLogService file', () => {
  test('field edited', () => {

    const changeLogService = new ChangeLogService();

    const diff = new DiffChecker();

    var objOld = {
      pattern: '\[w*]'
    };

    var objCurrente = {
      pattern: '/[w/W/s]*'
    };

    let changes = diff.getChangeDiff(objOld, objCurrente);

    let dicionaries: DictionaryDTO[] = [
      { description: 'Pattern alterado de {valorAntigo} para {valorAtual}', field: 'pattern', typeChange: TypeChange.edited }]

    let result = changeLogService.getChangeLogWithParseDictionary(changes, dicionaries);

    expect(result[0].description).toBe('Pattern alterado de \[w*] para /[w/W/s]*');
    expect(result[0].path).toBe('');
  });


  // test('field edited with subField', () => {

  //   const changeLogService = new ChangeLogService();

  //   const diff = new DiffChecker();

  //   var objOld = {
  //     release: {
  //       amount: 123
  //     }
  //   };

  //   var objCurrente = {
  //     release: {
  //       amount: 12.00
  //     }
  //   };

  //   let changes = diff.getChangeDiff(objOld, objCurrente);

  //   let dicionaries: DictionaryDTO[] = [
  //     { description: 'Pattern alterado de {valorAntigo} para {valorAtual}', field: 'pattern', typeChange: TypeChange.edited }]

  //   let result = changeLogService.getChangeLogWithParseDictionary(changes, dicionaries);

  //   expect(result[0].description).toBe('Pattern alterado de \[w*] para /[w/W/s]*');
  //   expect(result[0].path).toBe('');
  // });
});