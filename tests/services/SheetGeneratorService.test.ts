import ChangeLogDTO from "../../src/dtos/ChangeLogDTO";
import SheetGeneratorService from "../../src/services/SheetGeneratorService";
import { existsSync, unlinkSync } from 'fs';

describe('testing xlsx file generation', () => {
    // test('should generate xlsx file', () => {
    //     const service = new SheetGeneratorService();

    //     let dataMock: ChangeLogDTO[] = [
    //         {
    //             change: {
    //                 field: 'title',
    //                 valueCurrent: 'API Accounts - Open Banking Brasil',
    //                 valueOld: 'API CreditCard - Open Banking Brasil',
    //                 path: [
    //                     "paths",
    //                     "/accounts/{accountId}/overdraft-limits",
    //                     "get",
    //                     "tags",
    //                 ],
    //                 typeChange: 2
    //             },
    //             description: "Campo 'title' alterado de 'API CreditCard - Open Banking Brasil' para 'API Accounts - Open Banking Brasil'",
    //             path: 'info',
    //             field: 'title'
    //         }
    //     ]

    //     const fileName = "sheet_name_test"
    //     service.generate(dataMock, fileName)

    //     const result = existsSync(`output/${fileName}.xlsx`)

    //     console.log(result)
    //     expect(result).toBe(true);

    //     unlinkSync(`output/${fileName}.xlsx`)
    // });
});