import TemplateDescriptionDTO from "src/dtos/TemplateDescriptionDTO";
import { TypeChange } from "../constants/Constant";
import ChangeDTO from "../dtos/ChangeDTO";

export default class CustomDescriptionChangeLogService {

    public static addCustomChangeDescription(change: ChangeDTO, templateDescription?: TemplateDescriptionDTO): string {
        const { field, typeChange, valueCurrent, valueOld } = change;

        let description: string = "";

        let { templateAdded, templateEdited, templateRemoved, templateRequired } = templateDescription || {};

        templateAdded = this.replaceTemplateField(templateAdded, change);
        templateEdited = this.replaceTemplateField(templateEdited, change);
        templateRemoved = this.replaceTemplateField(templateRemoved, change);
        
        switch (change.typeChange) {
            case TypeChange.added: description = templateAdded || `'${change.field}' adicionado;`;
                break;
            case TypeChange.removed: description = templateRemoved || `'${change.field}' removido;`
                break;
            case TypeChange.edited: description = templateEdited || `'${change.field}' alterado;`
                break;
        }

        description = this.addCustomDescriptionByField(field, description, templateRequired);

        return description;
    }

    private static addCustomDescriptionByField(field: string, textOld: string, templateRequired?: string) {
        let description = textOld;

        if (field == 'required') {
            description = templateRequired || 'Alterado mandatoriedade;';
        }

        return description;
    }

    private static replaceTemplateField(template: string | undefined, change: ChangeDTO): string | undefined {
        return template?.replace('${field}', `${change.field}`);
    }
}