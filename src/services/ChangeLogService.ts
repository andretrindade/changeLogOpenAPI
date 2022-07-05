import { TypeChange } from "../constants/Constant";
import ChangeDTO from "../dtos/ChangeDTO";
import ChangeLogDTO from "../dtos/ChangeLogDTO";
import ChangeLogSeparatePerEndpointDTO from "../dtos/ChangeLogSeparatePerEndpointDTO";

export default class ChangeLogService{


    private createChangeLog(change:ChangeDTO): ChangeLogDTO{

        let description : string = "";

            switch(change.typeChange){
                case TypeChange.added : description = `Campo '${change.field}' adicionado.`
                break;
                
                case TypeChange.removed : description = `Campo '${change.field}' removido.`
                break;

                case TypeChange.edited : description = `Campo '${change.field}' alterado de '${change.valueOld}' para '${change.valueCurrent}'`
                break;
            }

        let changeLog : ChangeLogDTO = 
        {
            change : change, 
            description : description,
            path : change.path.join('/'), 
            field : change.field

        }

        return changeLog
    }
 
    public getChangeLog(changes: ChangeDTO[]): ChangeLogSeparatePerEndpointDTO[] {

        let changeLogs: ChangeLogDTO[] = [];
        changes.forEach(change => {

            changeLogs.push(this.createChangeLog(change));
                            
        });

        const changeLogsPerEndpoint = this.separateChangeLogPerEndpoint(changeLogs); 

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

                if(endpoint === changeLog.path) {
                    let formatEndpoint = this.formatEndpoint(endpoint); // format before checks logs
                   
                    if(changeLogSpeDTOList.filter(x=> x.endpoint == formatEndpoint).length !== 0) {
                        
                        changeLogSpeDTOList.filter(x=> x.endpoint == formatEndpoint)[0].changeLogs.push(changeLog) // recovering and storing logs
                    
                    } else {
                        let changeLogSpeDTO: ChangeLogSeparatePerEndpointDTO = 
                        {
                            endpoint : formatEndpoint,
                            changeLogs : [changeLog]
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

        for(const verb of verbsHttp) {
            if(path.includes(verb)) {
                path = path.split(verb)[0];
                break;
            }
        }

        return path; // case not found return himself
    }
}