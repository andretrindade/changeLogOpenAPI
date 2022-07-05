import { Workbook } from 'excel4node'
import * as fs from 'fs';
import ChangeLogDTO from '../dtos/ChangeLogDTO';
import ChangeLogSeparatePerEndpointDTO from '../dtos/ChangeLogSeparatePerEndpointDTO';

export default class SheetGeneratorService {

    public generate(data: ChangeLogSeparatePerEndpointDTO, fileName: String) {
        const wb = new Workbook();
        const ws = wb.addWorksheet('CHANGELOG');

        let models = []

        const keys = Object.getOwnPropertyNames(data);

        keys.forEach(key => {

            data[key].forEach(value => {
                let model = new OutputModel()

                model.endpoint = key
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
        const headingColumnNames = [
            "API",
            "ENDPOINT",
            "CAMPO",
            "ALTERAÇÃO"
        ]

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
}

enum COLUMNINDEX {
    "API" = 1,
    "ENDPOINT" = 2,
    "FIELD" = 3,
    "CHANGE" = 4
}