import ChangeLogSeparatePerEndpointDTO from "../dtos/ChangeLogSeparatePerEndpointDTO";
import ChangeLogViewOutputDTO from "../dtos/ChangeLogViewOutputDTO";

export default class FormattingChangeService{
    public formatting(changeLogs: ChangeLogSeparatePerEndpointDTO[]) : ChangeLogViewOutputDTO[] {
        
        let changeLogViewOutputList : ChangeLogViewOutputDTO[] = [];
        changeLogs.forEach(changePerEndPoint=>{
            changePerEndPoint.changeLogs.forEach(change=>{

            let changeLogViewOutputDto : ChangeLogViewOutputDTO = {
                 endpoint: this.replaceWord(changePerEndPoint.endpoint),
                 field: this.replaceWord(change.field),
                 description:  change.description.join("; "),
                 path: this.replaceWord(change.path.replace(changePerEndPoint.endpoint, ""))
            };
            changeLogViewOutputList.push(changeLogViewOutputDto);

        });
        });

        return changeLogViewOutputList;
        
    }

    public replaceWord(text : string): string{
        let lstReplace = this.wordsForRemove();
        lstReplace.forEach(x=>{
            text = text.split(x.from).join(x.to);
        })
        return text
    }

    public wordsForRemove(): any []{
        let lst : any[] = [
            {from: "content/application/json; charset=utf-8", to : ""},
            {from :"application/json/", to:""},
            {from :"paths//", to:""}
        ]


    return lst;
    }

}