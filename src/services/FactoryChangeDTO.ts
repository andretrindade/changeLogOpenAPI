import { TypeChange } from "../constants/Constant";
import ChangeDTO from "../dtos/ChangeDTO";

export default class  FactoryChangeDTO{

    public static createEdited(field: string, valueOld:any, valueCurrent: any, path : string):ChangeDTO{

        const change : ChangeDTO =  {
            field : field,
            valueCurrent : valueCurrent, 
            valueOld : valueOld, 
            path : path, 
            typeChange : TypeChange.edited };


        return change;
}

    public static createAdded(field: string, value:any, path : string):ChangeDTO{

        const change : ChangeDTO =  {
            field : field,
            valueCurrent : value, 
            path : path, 
            typeChange : TypeChange.added };


        return change;
    }

    public  static createRemoved(field: string, value:any, path : string):ChangeDTO{
        const change : ChangeDTO =  {
            field : field,
            valueOld : value, 
            path : path, 
            typeChange : TypeChange.removed };

        return change;
    }

}