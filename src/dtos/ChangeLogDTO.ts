import ChangeDTO from "./ChangeDTO"
import DictionaryDTO from "./DictionaryDTO"

export default class ChangeLogDTO{
    public dictionary ?: DictionaryDTO 
    public change : ChangeDTO
    public description: string;
    public path : string; 
    public api : string;

}