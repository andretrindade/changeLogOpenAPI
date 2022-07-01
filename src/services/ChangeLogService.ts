import { TypeChange } from "../constants/Constant";
import ChangeDTO from "../dtos/ChangeDTO";
import ChangeLogDTO from "../dtos/ChangeLogDTO";
import DictionaryDTO from "../dtos/DictionaryDTO";

export default class ChangeLogService{


    private createChangeLog(change:ChangeDTO): ChangeLogDTO{

        let description : string = "";

            switch(change.typeChange){
                case TypeChange.added : description = `Campo '${change.field}' adicionado.`
                break;
                
                case TypeChange.removed : description = `Campo '${change.field}' removido.`
                break;

                case TypeChange.edited : description = `Campo '${change.field}' alterado de '${change.valueOld}' para '${change.valueCurrent}'`
                break;
            }
 

        let changeLog : ChangeLogDTO = 
        {
            change : change, 
            description : description,
            path : change.path.join('/'), 
            field : change.field

        }

        return changeLog
    }
 
    public getChangeLog(changes: ChangeDTO[]): ChangeLogDTO[]{

        let changeLogs : ChangeLogDTO[] = [];
        changes.forEach(change=>{

            changeLogs.push(this.createChangeLog(change));
                            
        });

        return changeLogs;
    }
}