import { TypeChange } from "../constants/Constant";
import ChangeDTO from "../dtos/ChangeDTO";

export default class CustomDescriptionChangeLogService {

    public static addCustomChangeDescription(change: ChangeDTO): string {
        let description: string = "";

        switch (change.typeChange) {
            case TypeChange.added: description = `'${change.field}' adicionado;`
                break;
            case TypeChange.removed: description = `'${change.field}' removido;`
                break;
            case TypeChange.edited: description = `'${change.field}' alterado;`
                break;
        }

        description = this.addCustomDescriptionByField(change.field, change.typeChange, description, change.valueCurrent, change.valueOld);

        return description;
    }

    private static addCustomDescriptyRequired(field: string, type: TypeChange, textOld: string) {
        let description = textOld;
        if (TypeChange.added == type) {
            description = "Campo tornou-se obrigatório;"
        } else if (TypeChange.removed == type) {
            description = "Obrigatoriedade removida;"
        }
        return description
    }

    private static addCustomDescriptyConditional(valueCurrent: string, valueOld: string, type: TypeChange, textOld: string) {
        let description = textOld;

        const hasRestrictionOld = valueOld.includes('[Restrição]');
        const hasRestrictionCurrent = valueCurrent.includes('[Restrição]');

        const isAddedRestricion = TypeChange.added === type && !hasRestrictionOld && hasRestrictionCurrent;
        const isRemovedRestricion = TypeChange.removed === type && hasRestrictionOld && !hasRestrictionCurrent;
        const isEditedButRemovedRestricion = TypeChange.edited === type && hasRestrictionOld && !hasRestrictionCurrent;
        const isEditedButAddedRestricion = TypeChange.edited === type && !hasRestrictionOld && hasRestrictionCurrent;  

        if (isAddedRestricion || isEditedButAddedRestricion) {
            description = 'Tornou-se condicional;';
        } else if (isRemovedRestricion || isEditedButRemovedRestricion) {
            description = 'Removido a condicionalidade;';
        }
        
        return description;
    }

    private static addCustomDescriptionByField(field: string, type: TypeChange, textOld: string, valueCurrent?: string, valueOld?: string) {
        let description = textOld
        if (field == 'required') {
            description = this.addCustomDescriptyRequired(field, type, textOld);
        } else if(field === 'description') {
            description = this.addCustomDescriptyConditional(valueCurrent, valueOld, type, textOld);
        }

        return description;
    }
}