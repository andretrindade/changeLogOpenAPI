import ChangeDTO from "./ChangeDTO"

export default class ChangeLogDTO {
    public change: ChangeDTO;
    public resume: string;
    public detail: string[];
    public path: string;
    public field: string;
}