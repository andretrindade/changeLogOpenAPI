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
      expect(result[0].path.length).toBe(0);

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
      expect(result[0].path.length).toBe(0);

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
      expect(result[0].path.length).toBe(0);
  });

  test('field edited with subField', () => {

    const diff = new DiffChecker();

    var objOld = {
        campo: 'teste1',
        fee: {
          feeName : 'saque coberto'
        }
    };  

    

    var objCurrente = {
      campo: 'teste1',
      fee: {
        feeName : 'saque a descoberto'
      }
    };
    let result = diff.getChangeDiff(objOld,objCurrente);
    expect(result[0].valueOld).toBe('saque coberto');
    expect(result[0].valueCurrent).toBe('saque a descoberto');
    expect(result[0].path[0]).toBe('fee');
  });

  test('field removed with subField', () => {

    const diff = new DiffChecker();

    var objOld = {
        campo: 'teste1',
        fee: {
          feeAmount : 12.33,
          feeName : 'saque coberto'
        }
    };  

    

    var objCurrente = {
      campo: 'teste1',
      fee: {
        feeName : 'saque coberto'
      }
    };
    let result = diff.getChangeDiff(objOld,objCurrente);
    expect(result[0].valueOld).toBe(12.33);
    expect(result[0].valueCurrent).toBe(undefined);
    expect(result[0].path[0]).toBe('fee');
  });

  test('field added with subField', () => {

    const diff = new DiffChecker();

    var objOld = {
        campo: 'teste1',
        fee: {
          feeName : 'saque coberto'
        }
    };  

    

    var objCurrente = {
      campo: 'teste1',
      fee: {
        feeAmount : 12.33,
        feeName : 'saque coberto'
      }
    };
    let result = diff.getChangeDiff(objOld,objCurrente);
    expect(result[0].valueOld).toBe(undefined);
    expect(result[0].valueCurrent).toBe(12.33);
    expect(result[0].path[0]).toBe('fee');
  });

  test('field added with array', () => {

    const diff = new DiffChecker();

    var objOld = {
        campo: 'teste1',
        fee: [{
          feeName : 'saque coberto'
        }]
    };  

    

    var objCurrente = {
      campo: 'teste1',
      fee: [{
        feeAmount : 12.33,
        feeName : 'saque coberto'
      }]
    };
    let result = diff.getChangeDiff(objOld,objCurrente);
    expect(result[0].valueOld).toBe(undefined);
    expect(result[0].valueCurrent).toBe(12.33);
    expect(result[0].path[0]).toBe('fee');
  });

  test('field edited with array', () => {

    const diff = new DiffChecker();

    var objOld = {
        campo: 'teste1',
        fee: [{
          feeAmount : 12.33,
          feeName : 'saque coberto'
        }]
    };  

    

    var objCurrente = {
      campo: 'teste1',
      fee: [{
        feeAmount : 12.33,
        feeName : 'saque a desberto'
      }]
    };
    let result = diff.getChangeDiff(objOld,objCurrente);
    expect(result[0].valueOld).toBe("saque coberto");
    expect(result[0].valueCurrent).toBe("saque a desberto");
    expect(result[0].path[0]).toBe('fee');
  });

  test('field removed with array', () => {

    const diff = new DiffChecker();

    var objOld = {
        campo: 'teste1',
        release : {
          fee: [{
            feeAmount : 12.33,
            feeName : 'saque coberto'
          }]
        }
    };  

    var objCurrente = {
      campo: 'teste1',
      release : {
        fee: [{
        feeName : 'saque a desberto'
       } ]
      }
    };
    let result = diff.getChangeDiff(objOld,objCurrente);
    expect(result[0].valueOld).toBe(12.33);
    expect(result[0].valueCurrent).toBe(undefined);
    expect(result[0].path[0]).toBe('release');
    expect(result[0].path[1]).toBe('fee');
  });
});