import { Workbook } from 'excel4node'
import * as fs from 'fs';
import ChangeLogDTO from '../dtos/ChangeLogDTO';
import ChangeLogSeparatePerEndpointDTO from '../dtos/ChangeLogSeparatePerEndpointDTO';
import ChangeLogViewOutputDTO from '../dtos/ChangeLogViewOutputDTO';

export default class SheetGeneratorService {

    private  SEPARATOR_CSV : string = ";";
    private getHeader():string{

        const headingColumnNames = [
            "ENDPOINT",
            "PATH",
            "CAMPO",
            "ALTERAÇÃO"
        ]

        let header = headingColumnNames.reduce(x => x +this.SEPARATOR_CSV);

        return header;
    }

    public body(changes: ChangeLogViewOutputDTO): String{

        return changes.;
    }

    public generate(changes: ChangeLogViewOutputDTO[], fileName: String) {


        const header = this.getHeader();

        let body = changes.map(x=>body(x));


        const wb = new Workbook();
        const ws = wb.addWorksheet('CHANGELOG');

        let models = []

        const keys = Object.getOwnPropertyNames(data);

        keys.forEach(key => {

            changes[key].forEach(value => {
                let model = new OutputModel()
                let path =  value.change.path.join("/").replace(key, "")
                model.endpoint = key.replace("paths//", "")
                model.path = path
                model.field = value.field
                model.change = value.description

                models.push(model)
            })
        })

        this.createHeader(ws)

        this.fillWorksheet(models, ws)

        const path = "output"
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        wb.write(path + `/${fileName}.xlsx`);
    }

    private createHeader(ws: any) {


        let headingColumnIndex = 1;
        headingColumnNames.forEach(heading => {
            ws.cell(1, headingColumnIndex++).string(heading);
        });
    }

    private fillWorksheet(data: any, ws: any) {
        let rowIndex = 2;

        data.forEach(record => {
            let columnIndex = 1;
            Object.keys(record).forEach(columnName => {
                ws.cell(rowIndex, COLUMNINDEX[columnName.toUpperCase()])
                    .string(record[columnName])
            });

            rowIndex++;
        });
    }
}

class OutputModel {
    endpoint: String
    field: String
    change: String
    path:String
}

enum COLUMNINDEX {
    "ENDPOINT" = 1,
    "PATH" = 2,
    "FIELD" = 3,
    "CHANGE" = 4
}