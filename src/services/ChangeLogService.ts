import { TypeChange } from "../constants/Constant";
import ChangeDTO from "../dtos/ChangeDTO";
import ChangeLogDTO from "../dtos/ChangeLogDTO";
import ChangeLogSeparatePerEndpointDTO from "../dtos/ChangeLogSeparatePerEndpointDTO";

export default class ChangeLogService {

    private addCustomDescriptionOfChangeDTO(change: ChangeDTO): string {
        let description: string = "";

        switch (change.typeChange) {
            case TypeChange.added: description = `Campo '${change.field}' adicionado`
                break;

            case TypeChange.removed: description = `Campo '${change.field}' removido`
                break;

            case TypeChange.edited: description = `Campo '${change.field}' alterado de '${change.valueOld}' para '${change.valueCurrent}'`
                break;
        }

        return description;
    }

    private changeRequiredField(change: ChangeDTO): ChangeDTO{
        if(change.path.slice(-1)[0] == "required"){
            change.path.pop();
            change.path.push(change.field);
            change.field = "required";
            change.valueOld = "required";
            change.valueCurrent = "required";
        }
        return change;
    }

    private createChangeLog(change: ChangeDTO): ChangeLogDTO {

       // change = this.changeRequiredField(change);
        let description = this.addCustomDescriptionOfChangeDTO(change);

        let changeLog: ChangeLogDTO =
        {
            change: change,
            description: [description],
            path: change.path.join('/'),
            field: change.field

        }

        return changeLog
    }

    public getChangeLog(changes: ChangeDTO[]): ChangeLogSeparatePerEndpointDTO[] {

        let changeLogs: ChangeLogDTO[] = [];
        changes.forEach(change => {

            changeLogs.push(this.createChangeLog(change));

        });

        const changeLogsPerEndpoint = this.separateChangeLogPerEndpoint(changeLogs);
        //const changeLogsWithGroupField = this.groupChangeLogsByField(changeLogsPerEndpoint);
        return changeLogsPerEndpoint;
    }
    groupChangeLogsByField(changeLogsPerEndpoints: ChangeLogSeparatePerEndpointDTO[]): ChangeLogSeparatePerEndpointDTO[] {

        changeLogsPerEndpoints.forEach(changeLogsPerEndPoint => {
            let changeLogs: ChangeLogDTO[] = [];
            changeLogsPerEndPoint.changeLogs
                .sort((a, b) => (a.path > b.path) ? -1 : 1)
                .forEach(changeLog => {
                    let path = changeLog.change.path.filter(x=>x !== "properties");
                    let fieldAsc = path.slice(-1)
                    let pathWithAsc = path.slice(0, path.length).join('/');
                    let field = changeLog.field;
                    // Problema relacionado ao required 
                    // duplicando ...
                    // if(field == 'required'){
                    //     pathWithAsc = path.slice(0, path.length - 1).join('/');
                    // }
                    if (this.getWordFieldForGroup().includes(field.toLowerCase())) {
                        if (changeLogs.filter(x => x.path == pathWithAsc).length == 0) {
                            changeLogs.push({
                                change: changeLog.change,
                                description: changeLog.description,
                                field: fieldAsc[0],
                                path: pathWithAsc
                            })
                        } else {
                            changeLogs.filter(x => pathWithAsc).forEach(x => {
                                x.description.push(...changeLog.description)
                            });
                        }
                    } else {
                        changeLogs.push(changeLog);
                    }
                });
            changeLogsPerEndPoint.changeLogs = changeLogs;
        })

        return changeLogsPerEndpoints;
    }

    private getWordFieldForGroup(): String[] {
        let lst = ["pattern", "type",
            "maxitem", "minitem",
            "maxlength", "minlength",
            "description", "example",
            "minimum", "maximum",
            "required",
            "exclusiveMinimum", "nullable", "additionalproperties", "format"]
        return lst;
    }

    public separateChangeLogPerEndpoint(changes: ChangeLogDTO[]): ChangeLogSeparatePerEndpointDTO[] {

        let changeLogSpeDTOList: ChangeLogSeparatePerEndpointDTO[] = [];

        let endpoints = new Set();
        changes.map(changeLog => {
            const endpoint = changeLog.path;
            endpoints.add(endpoint); // getting e storing endpoint(s) 
        });

        endpoints.forEach(endpoint => {

            changes.forEach(changeLog => {

                if (endpoint === changeLog.path) {
                    let formatEndpoint = this.formatEndpoint(endpoint); // format before checks logs

                    if (changeLogSpeDTOList.filter(x => x.endpoint == formatEndpoint).length !== 0) {

                        changeLogSpeDTOList.filter(x => x.endpoint == formatEndpoint)[0].changeLogs.push(changeLog) // recovering and storing logs

                    } else {
                        let changeLogSpeDTO: ChangeLogSeparatePerEndpointDTO =
                        {
                            endpoint: formatEndpoint,
                            changeLogs: [changeLog]
                        }
                        changeLogSpeDTOList.push(changeLogSpeDTO)
                    }
                }
            });
        });

        return changeLogSpeDTOList;
    }

    private formatEndpoint(path: string): string {
        const verbsHttp: string[] = ['get', 'post', 'patch', 'put', 'delete']; // format per verb

        for (const verb of verbsHttp) {
            if (path.includes(verb)) {
                path = path.split(verb)[0];
                break;
            }
        }

        return path; // case not found return himself
    }
}