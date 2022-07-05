import ChangeLogDTO from "./ChangeLogDTO";

export default class ChangeLogSeparatePerEndpointDTO {
    [endpoint: string]: ChangeLogDTO[];
}