import { Workbook } from 'excel4node'
import * as fs from 'fs';
import ChangeLogDTO from '../dtos/ChangeLogDTO';

export default class SheetGeneratorService {

    public generate(data: ChangeLogDTO[], fileName: String) {
        const wb = new Workbook();
        const ws = wb.addWorksheet('CHANGELOG');

        let models = []

        data.forEach(value => {
            let model = new Model()

            model.api = "API name"
            model.endpoint = value.path
            model.field = value.field
            model.change = value.description

            models.push(model)
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

class Model {
    api: String
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