import ChangeDTO from "../dtos/ChangeDTO";
import ChangeLogDTO from "../dtos/ChangeLogDTO";
import DictionaryDTO from "../dtos/DictionaryDTO";

export default class ChangeLogService{


    public createChangeLog(change:ChangeDTO, dictionary?: DictionaryDTO): ChangeLogDTO{

        let description : string = "";
        if(dictionary){
            description = dictionary.description;
            description = description.replace("{valorAntigo}", change.valueOld)
            description = description.replace("{valorAtual}", change.valueCurrent)
        }

        let changeLog : ChangeLogDTO = 
        {
            change : change, 
            dictionary : dictionary,
            description : description,
            path : change.path, 
            api : change.field

        }

        return changeLog
    }
 
    public getChangeLogWithParseDictionary(changes: ChangeDTO[], dictonaries:DictionaryDTO[]): ChangeLogDTO[]{

        let changeLogs : ChangeLogDTO[] = [];
        changes.forEach(change=>{

            let dics = dictonaries
                .filter(dic=> dic.field === change.field 
                                &&  dic.typeChange === change.typeChange);
            
            if(dics.length > 0){
                changeLogs.push(this.createChangeLog(change, dics[0]));
            }
                                
        });

        return changeLogs;

    }



}