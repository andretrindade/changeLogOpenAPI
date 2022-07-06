import { Workbook } from 'excel4node'
import * as fs from 'fs';
import ChangeLogViewOutputDTO from '../dtos/ChangeLogViewOutputDTO';

export default class SheetGeneratorService {


    public generate(changes: ChangeLogViewOutputDTO[], fileName: String) {


        const wb = new Workbook();
        const ws = wb.addWorksheet('CHANGELOG');

        this.createHeader(ws)

        this.fillWorksheet(changes, ws)

        const path = "output"
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        wb.write(path + `/${fileName}.xlsx`);
    }

    private createHeader(ws: any) {
        const headingColumnNames = [
            "ENDPOINT",
            "CAMINHO",
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

enum COLUMNINDEX {
    "ENDPOINT" = 1,
    "PATH" = 2,
    "FIELD" = 3,
    "DESCRIPTION" = 4
}