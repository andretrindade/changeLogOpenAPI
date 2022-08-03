import TemplateDescriptionDTO from "src/dtos/TemplateDescriptionDTO";
import ChangeDTO from "../dtos/ChangeDTO";
import ChangeLogDTO from "../dtos/ChangeLogDTO";
import ChangeLogSeparatePerEndpointDTO from "../dtos/ChangeLogSeparatePerEndpointDTO";
import CustomDescriptionChangeLogService from "./CustomDescriptionChangeLogService";

export default class ChangeLogService {

    private createChangeLog(change: ChangeDTO, templateDescription?: TemplateDescriptionDTO): ChangeLogDTO {

        let description = CustomDescriptionChangeLogService.addCustomChangeDescription(change, templateDescription);

        let changeLog: ChangeLogDTO =
        {
            change: change,
            path: change.path.join('/'),
            field: change.field,
            currentValue: change.valueCurrent,
            oldValue: change.valueOld,
            description: description
        }

        return changeLog
    }

    public getChangeLog(changes: ChangeDTO[], templateDescription?: TemplateDescriptionDTO): ChangeLogSeparatePerEndpointDTO[] {

        let changeLogs: ChangeLogDTO[] = [];
        changes.forEach(change => {

            changeLogs.push(this.createChangeLog(change, templateDescription));

        });

        const changeLogsPerEndpoint = this.separateChangeLogPerEndpoint(changeLogs);
        //const changeLogsWithGroupField = this.groupChangeLogsByField(changeLogsPerEndpoint);
        return changeLogsPerEndpoint;
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