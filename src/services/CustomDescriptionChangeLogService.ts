import TemplateDescriptionDTO from "src/dtos/TemplateDescriptionDTO";
import { TypeChange } from "../constants/Constant";
import ChangeDTO from "../dtos/ChangeDTO";

export default class CustomDescriptionChangeLogService {

    public static addCustomChangeDescription(change: ChangeDTO, templateDescription?: TemplateDescriptionDTO): string {
        const { field, valueCurrent } = change;

        let description: string = "";

        let { templateAdded, templateEdited, templateRemoved, templateRequired } = templateDescription || {};

        templateAdded = this.replaceTemplateField(templateAdded, change);
        templateEdited = this.replaceTemplateField(templateEdited, change);
        templateRemoved = this.replaceTemplateField(templateRemoved, change);
        
        switch (change.typeChange) {
            case TypeChange.added: description = templateAdded || `'${field}' adicionado;`;
                break;
            case TypeChange.removed: description = templateRemoved || `'${field}' removido;`
                break;
            case TypeChange.edited: description = templateEdited || `'${field}' alterado;`
                break;
        }

        description = this.addCustomDescriptionByValue(valueCurrent, description, templateRequired);

        return description;
    }

    private static addCustomDescriptionByValue(valueCurrent: string = "", textOld: string, templateRequired?: string) {
        let description = textOld;

        if (valueCurrent == 'required') {
            description = templateRequired || 'Alterado mandatoriedade;';
        }

        return description;
    }

    private static replaceTemplateField(template: string | undefined, change: ChangeDTO): string | undefined {
        return template?.replace('${field}', `${change.field}`);
    }
}