import ChangeDTO from "../dtos/ChangeDTO";
import FactoryChangeDTO from "./FactoryChangeDTO";

export default class DiffChecker {



  public getChangeDiff(objOld: any, objCurrent: any): ChangeDTO[] {
    let changes = this.diff(objOld, objCurrent);
    return changes;
  }

  public diff(objOld: any, objCurrent: any): ChangeDTO[] {
    var typeOld = typeof objOld;
    var typeCurrent = typeof objCurrent;
    var fieldsOld = Object.getOwnPropertyNames(objOld);
    var fieldsCurrent = Object.getOwnPropertyNames(objCurrent);
    let changes: ChangeDTO[] = [];


    changes.push(...this.getFieldEditedOrRemoved(objOld, objCurrent));

    changes.push(...this.getFieldAdded(objOld, objCurrent));


    return changes;
  }

  public getFieldAdded(objOld: any, objCurrent: any): ChangeDTO[] {
    let changes: ChangeDTO[] = [];
    var fieldsOld = Object.getOwnPropertyNames(objOld);
    var fieldsCurrent = Object.getOwnPropertyNames(objCurrent);

    let fieldsCurrentAdded = fieldsCurrent
      .filter(current => !fieldsOld.includes(current))

    fieldsCurrentAdded.forEach(fieldCurrent => {
      changes.push(
        FactoryChangeDTO.createAdded(fieldCurrent, objCurrent[fieldCurrent], fieldCurrent)
      );
    })
    return changes;
  }

  public getFieldEditedOrRemoved(objOld: any, objCurrent: any): ChangeDTO[] {
    let changes: ChangeDTO[] = [];
    var fieldsOld = Object.getOwnPropertyNames(objOld);
    var fieldsCurrent = Object.getOwnPropertyNames(objCurrent);

    fieldsOld.forEach(fieldOld => {
      let objChange: ChangeDTO;

      let fielndCurrent = fieldsCurrent.find(fielndCurrent => fielndCurrent === fieldOld);
      let valueOld = objOld[fieldOld];


      // was edited
      if (fielndCurrent !== undefined) {
        let valueCurrent = objCurrent[fielndCurrent];

        if (valueOld !== valueCurrent) {
          objChange = FactoryChangeDTO.createEdited(fieldOld, valueOld, valueCurrent, fieldOld)
        }
      }
      // was removed
      else {
        objChange = FactoryChangeDTO.createRemoved(fieldOld, valueOld, fieldOld)
      }

      if (objChange) {
        changes.push(objChange);
      }
    });

    return changes;
  }
}