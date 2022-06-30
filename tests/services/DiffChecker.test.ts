import DiffChecker from "../../src/services/DiffChecker"; 

describe('testing diffCheckers file', () => {
  test('field edited', () => {

    const diff = new DiffChecker();

    var objOld = {
        campo: 'teste1'
    };  

    var objCurrente = {
        campo: 'teste2'
    };
    let result = diff.getChangeDiff(objOld,objCurrente);

      expect(result[0].valueCurrent).toBe('teste2');
      expect(result[0].valueOld).toBe('teste1');
      expect(result[0].path).toBe('campo');
  });

  test('field Added', () => {

    const diff = new DiffChecker();

    var objOld = {
        campo: 'teste1'
    };  

    var objCurrente = {
        campo: 'teste1',
        nome: 'andre'
    };
    let result = diff.getChangeDiff(objOld,objCurrente);

      expect(result[0].valueCurrent).toBe('andre');
      expect(result[0].valueOld).toBe(undefined);
      expect(result[0].path).toBe('nome');
  });

  test('field removed', () => {

    const diff = new DiffChecker();

    var objOld = {
        campo: 'teste1',
        amount : 123
    };  

    var objCurrente = {
        campo: 'teste1'
    };
    let result = diff.getChangeDiff(objOld,objCurrente);

      expect(result[0].valueCurrent).toBe(undefined);
      expect(result[0].valueOld).toBe(123);
      expect(result[0].path).toBe('amount');
  });
});