import ChangeDTO from "../dtos/ChangeDTO";
import FactoryChangeDTO from "../dtos/FactoryChangeDTO";

export default class DiffCheckerService {



  public getChangeDiff(objOld: any, objCurrent: any): ChangeDTO[] {
    let changes = this.diff(objOld, objCurrent);
    return changes;
  }

  public groupFieldChangeDiff(changes: ChangeDTO[]): ChangeDTO[] {
    return null;
  }

  private diff(objOld: any, objCurrent: any, path?: string[]): ChangeDTO[] {
    path = path || [];
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
          path.push(fieldCurrent);
          let changesWithObjecArray = this.getChangeDiffArray(fieldCurrent, valueOld, valueCurrent, path)
          changes.push(...changesWithObjecArray);
          path.pop();

        } else {

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

  public getChangeDiffArray(field: string, objOld: object[], objCurrent: object[], path: string[]): ChangeDTO[] {
    let changes: ChangeDTO[] = [];
    let pathWithField = path;
    // pathWithField.push(field);
    let objRemoved = objOld.filter(x => !objCurrent.includes(x));

    let objAdded = objCurrent.filter(x => !objOld.includes(x));

    objAdded.forEach((x: any) => {
      let element = this.getCustomArrayFieldChange(field, pathWithField, x);
      changes.push(
        FactoryChangeDTO.createAdded(element.fieldReal, element.valueReal, element.path)
      );
    });

    objRemoved.forEach((x: any) => {
      let element = this.getCustomArrayFieldChange(field, pathWithField, x);
      changes.push(
        FactoryChangeDTO.createRemoved(element.fieldReal, element.valueReal, element.path)
      );

    })

    return changes;
  }


  private getCustomArrayFieldChange(field, path: string[], value: any): any {
    if (field == "required") {
      field = value;
      value = "required";
    }
    return { fieldReal: field, valueReal: value, path };
  }
}