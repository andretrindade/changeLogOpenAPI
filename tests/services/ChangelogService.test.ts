import { TypeChange } from "../../src/constants/Constant";
import ChangeDTO from "../../src/dtos/ChangeDTO";
import DictionaryDTO from "../../src/dtos/DictionaryDTO";
import ChangeLogService from "../../src/services/ChangeLogService";
import DiffChecker from "../../src/services/DiffCheckerService";

describe('testing changeLogService file', () => {
  test('field edited with subField', () => {

    const changeLogService = new ChangeLogService();

    const diff = new DiffChecker();

    var objOld = {
      release : {
        pattern: '\[w*]'
      }
    };

    var objCurrente = {
      release : {
        pattern: '/[w/W/s]*'
      }
    };

    let changes = diff.getChangeDiff(objOld, objCurrente);

    let result = changeLogService.getChangeLog(changes);
end
    expect(result.["release"][0].description).toBe("Campo 'pattern' alterado de '\[w*]' para '/[w/W/s]*'");
    expect(result["release"][0].path).toBe('release');
  });


  
  test('field added with subField', () => {

    const changeLogService = new ChangeLogService();

    const diff = new DiffChecker();

    var objOld = {
      release : {
        pattern: '\[w*]'
      }
    };

    var objCurrente = {
      release : {
        pattern: '\[w*]',
        maxItem: 2
      }
    };

    let changes = diff.getChangeDiff(objOld, objCurrente);

    let result = changeLogService.getChangeLog(changes);

    expect(result["release"][0].description).toBe("Campo 'maxItem' adicionado.");
    expect(result["release"][0].path).toBe('release');
  });
});