import ChangeDTO from "./ChangeDTO"
import DictionaryDTO from "./DictionaryDTO"

export default class ChangeLogDTO{
    public change : ChangeDTO
    public description: string[];
    public path : string; 
    public field : string;

}