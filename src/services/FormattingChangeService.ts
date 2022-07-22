import ChangeLogSeparatePerEndpointDTO from "../dtos/ChangeLogSeparatePerEndpointDTO";
import ChangeLogViewOutputDTO from "../dtos/ChangeLogViewOutputDTO";
import { from } from "linq-to-typescript"

export default class FormattingChangeService {
    public formatting(changeLogs: ChangeLogSeparatePerEndpointDTO[]): ChangeLogViewOutputDTO[] {

        let changeLogViewOutputList: ChangeLogViewOutputDTO[] = [];
        changeLogs.forEach(changePerEndPoint => {
            changePerEndPoint.changeLogs.forEach(change => {

                let changeLogViewOutputDto: ChangeLogViewOutputDTO = {
                    endpoint: this.replaceWord(changePerEndPoint.endpoint),
                    field: this.replaceWord(change.field),
                    description: change.description,
                    currentValue: this.formatValueAsString(change.currentValue),
                    oldValue: this.formatValueAsString(change.oldValue),
                    path: this.replaceWord(change.path.replace(changePerEndPoint.endpoint, ""))
                };
                changeLogViewOutputList.push(changeLogViewOutputDto);
            });
        });

        let lst = from(changeLogViewOutputList)
            .orderBy(x => x.endpoint)
            .thenBy(x => x.path)
            .thenBy(x => x.field).toArray();
        return lst;
    }

    private formatValueAsString(value: any): String {
        if (typeof value == "object" || !value) {
            return ""
        }
        return value.toString();
    }

    public replaceWord(text: string): string {
        let lstReplace = this.wordsForRemove();
        lstReplace.forEach(x => {
            text = text.split(x.from).join(x.to);
        })
        return text
    }

    public wordsForRemove(): any[] {
        let lst: any[] = [
            { from: "content/application/json; charset=utf-8", to: "" },
            { from: "application/json/", to: "" },
            { from: "paths//", to: "" }
        ]

        return lst;
    }
}