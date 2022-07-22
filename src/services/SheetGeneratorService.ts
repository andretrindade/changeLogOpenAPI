import { Workbook } from 'excel4node'
import ChangeLogViewOutputDTO from '../dtos/ChangeLogViewOutputDTO';

export default class SheetGeneratorService {


    public generate(changes: ChangeLogViewOutputDTO[], fileFullName: String):  string {


        const wb = new Workbook();
        const ws = wb.addWorksheet('CHANGELOG');

        this.createHeader(ws)

        this.fillWorksheet(changes, ws)
        let fileName = `${fileFullName}changeLog.xlsx`;
        wb.write(fileName);

        return fileName;

    }

    private createHeader(ws: any) {
        const headingColumnNames = [
            "ENDPOINT",
            "CAMINHO",
            "CAMPO",
            "DESCRIÇÃO",
            "VALOR ANTERIOR",
            "VALOR ATUAL"
        ]

        let headingColumnIndex = 1;
        headingColumnNames.forEach(heading => {
            ws.cell(1, headingColumnIndex++).string(heading);
        });
    }

    private fillWorksheet(data: any, ws: any) {
        let rowIndex = 2;

        data.forEach(record => {
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
    "DESCRIPTION" = 4,
    "OLDVALUE" = 5,
    "CURRENTVALUE" = 6
}