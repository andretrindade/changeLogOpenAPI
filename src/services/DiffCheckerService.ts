import ChangeDTO from "../dtos/ChangeDTO";
import FactoryChangeDTO from "../dtos/FactoryChangeDTO";

export default class DiffCheckerService {



  public getChangeDiff(objOld: any, objCurrent: any): ChangeDTO[] {
    let changes = this.diff(objOld, objCurrent);
    return changes;
  }

  private diff(objOld: any, objCurrent: any, path?: string[]): ChangeDTO[] {
    var typeOld = typeof objOld;
    var typeCurrent = typeof objCurrent;
    path = path || [];
    var fieldsOld = Object.getOwnPropertyNames(objOld);
    var fieldsCurrent = Object.getOwnPropertyNames(objCurrent);
    let changes: ChangeDTO[] = [];


    changes.push(...this.getFieldEditedOrRemoved(objOld, objCurrent, path));

    changes.push(...this.getFieldAdded(objOld, objCurrent, path));

    return changes;
  }

  public getFieldAdded(objOld: any, objCurrent: any, path: string[]): ChangeDTO[] {
    let changes: ChangeDTO[] = [];
    var fieldsOld = Object.getOwnPropertyNames(objOld);
    var fieldsCurrent = Object.getOwnPropertyNames(objCurrent);

    let fieldsCurrentAdded = fieldsCurrent
      .filter(current => !fieldsOld.includes(current))

    fieldsCurrentAdded.forEach(fieldCurrent => {
      changes.push(
        FactoryChangeDTO.createAdded(fieldCurrent, objCurrent[fieldCurrent], path)
      );
    })
    return changes;
  }

  public getFieldEditedOrRemoved(objOld: any, objCurrent: any, path: string[]): ChangeDTO[] {
    let changes: ChangeDTO[] = [];
    var fieldsOld = Object.getOwnPropertyNames(objOld);
    var fieldsCurrent = Object.getOwnPropertyNames(objCurrent);

    fieldsOld.forEach(fieldOld => {
      let objChange: ChangeDTO;

      let fieldCurrent = fieldsCurrent.find(fielndCurrent => fielndCurrent === fieldOld);
      let valueOld = objOld[fieldOld];


      // was edited
      if (fieldCurrent !== undefined) {
        let valueCurrent = objCurrent[fieldCurrent];

        if (Array.isArray(valueCurrent) && typeof valueCurrent[0] !== 'object') {
          let changesWithObjecArray = this.getChangeDiffArray(fieldCurrent,valueOld,valueCurrent,path)
          if(changesWithObjecArray){
            changes.push(...changesWithObjecArray);
            path.pop();
          }

        }else{

          if (Array.isArray(valueCurrent) && typeof valueCurrent[0] == 'object') {

            valueCurrent = valueCurrent[0];
            valueOld = valueOld[0];
          }
          if (typeof valueCurrent == 'object') {
            path.push(fieldCurrent);
            changes.push(...this.diff(valueOld, valueCurrent, path));
            path.pop();
          } else
            if (valueOld !== valueCurrent) {
              objChange = FactoryChangeDTO.createEdited(fieldOld, valueOld, valueCurrent, path)
            }
        }
      }
      // was removed
      else {
        objChange = FactoryChangeDTO.createRemoved(fieldOld, valueOld, path);

      }

      if (objChange) {
        changes.push(objChange);
      }
    });

    return changes;
  }

  public getChangeDiffArray(field : string,objOld : object[], objCurrent : object[], path : string[]):ChangeDTO[]{
    let changes: ChangeDTO[] = [];
    let pathWithField = path;
    pathWithField.push(field);
    let objRemoved = objOld.filter(x=> !objCurrent.includes(x)); 

    let objAdded = objCurrent.filter(x=> !objOld.includes(x));

    objAdded.forEach(x=>{
      changes.push(
        FactoryChangeDTO.createAdded(x.toString(), x, pathWithField)
      );
    });

    objRemoved.forEach(x=>{
      changes.push(
        FactoryChangeDTO.createRemoved(x.toString(), x, pathWithField)
      );
    })

    return changes;
  }
}