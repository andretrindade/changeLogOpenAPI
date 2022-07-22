import * as fs from 'fs';

export default class FileExtensionService{
    public static CreateFolderByFullPath(fileFullName:string){
        let path = fileFullName.split("/");
        path.pop();
        try {
            let pathAmount = "";
            path.forEach(x => {
                pathAmount += `${x}/`
                if (!fs.existsSync(pathAmount)) {
                    fs.mkdirSync(pathAmount);
                }
            })
        } catch (exception) {
            process.stderr.write(`ERROR received - createFolders: ${exception}\n`);
        }
    }
}