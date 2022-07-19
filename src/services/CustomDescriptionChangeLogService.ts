import { TypeChange } from "../constants/Constant";
import ChangeDTO from "../dtos/ChangeDTO";

export default class CustomDescriptionChangeLogService {

    public static addResumedChangeDescription(change: ChangeDTO): string {
        let description: string = "";

        switch (change.typeChange) {
            case TypeChange.added: description = `'${change.field}' adicionado;`
                break;

            case TypeChange.removed: description = `'${change.field}' removido;`
                break;

            case TypeChange.edited: description = `'${change.field}' alterado;`
                break;
        }

        description = this.addCustomDescriptionByField(change.field, change.typeChange, description);

        return description;
    }

    public static addDetailedChangeDescription(change: ChangeDTO): string {
        let description: string = "";

        if (change.typeChange == TypeChange.added && typeof change.valueCurrent != 'object') {
            description = `'${change.field}': '${change.valueCurrent}';`
        } else if (change.typeChange == TypeChange.edited) {
            description = `'${change.field}' alterado de '${change.valueOld}' para '${change.valueCurrent}';`
        }

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

    private static addCustomDescriptionByField(field: string, type: TypeChange, textOld: string) {
        let description = textOld
        if (field == "required") {
            description = this.addCustomDescriptyRequired(field, type, textOld);
        }

        return description
    }
}