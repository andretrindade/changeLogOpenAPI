import * as yaml from "js-yaml"
import * as fs from "fs"

export default class  YamlToObjectJsonService{

  
  public convert(fileYaml:string):any {

    const obj = yaml
        .load(fs.readFileSync(fileYaml, { encoding: "utf-8"}));

    return obj;
  }
  }