import ChangeLogSeparatePerEndpointDTO from "../dtos/ChangeLogSeparatePerEndpointDTO";
import ChangeLogViewOutputDTO from "../dtos/ChangeLogViewOutputDTO";

export default class FormattingChangeService{
    public formatting(changeLogs: ChangeLogSeparatePerEndpointDTO[]) : ChangeLogViewOutputDTO[] {
        
        let changeLogViewOutputList : ChangeLogViewOutputDTO[] = [];
        changeLogs.forEach(changePerEndPoint=>{
            changePerEndPoint.changeLogs.forEach(change=>{

            let changeLogViewOutputDto : ChangeLogViewOutputDTO = {
                 endpoint: changePerEndPoint.endpoint.replace("paths//", ""),
                 field: this.replaceWord(change.field),
                 change:  change.description,
                 path: change.change.path.join("/").replace(changePerEndPoint.endpoint, "")

            };
            changeLogViewOutputList.push(changeLogViewOutputDto);

        });
        });

        return changeLogViewOutputList;
        
    }

    public replaceWord(description : string): string{
        let lstReplace = this.wordsForRemove();
        lstReplace.forEach(x=>{
            description = description.replace(x.from, x.to);
        })

        return description;
    }

    public wordsForRemove(): any []{
        let lst : any[] = [
            {from: "content/application/json; charset=utf-8", to : ""}]


    return lst;
    }

}