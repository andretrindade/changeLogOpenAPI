import { TypeChange } from "../constants/Constant";
import ChangeDTO from "../dtos/ChangeDTO";

export default class CustomDescriptionChangeLogService {

    public static addCustomDescriptionOfChangeDTO(change: ChangeDTO): string {
        let description: string = "";

        switch (change.typeChange) {
            case TypeChange.added: description = `'${change.field}' adicionado;`
                break;

            case TypeChange.removed: description = `'${change.field}' removido;`
                break;

            case TypeChange.edited: description = `'${change.field}' alterado de '${change.valueOld}' para '${change.valueCurrent}';`
                break;
        }

        description = this.addCustomDescriptionByField(change.field, change.typeChange,description );

        return description;
    }
    private static addCustomDescriptyRequired(field:string, type: TypeChange,textOld : string){
        let description = textOld;
        if(TypeChange.added == type){
            description = "Campo tornou-se obrigatório;"
        }else if(TypeChange.edited == type){
            description = "Obrigatoriedade removida;"
        }
        return description
    }

    private static addCustomDescriptionByField(field:string, type: TypeChange, textOld : string){
        let description = textOld

        if(field=="required"){
            description = this.addCustomDescriptyRequired(field,type,textOld);
        }

        return description
    }

}