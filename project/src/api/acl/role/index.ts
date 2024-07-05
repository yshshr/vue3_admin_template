import request from "@/utils/request";
import type{GetRoleResponseData, RoleData} from './type'

enum API{
    ROLELIST_URL='/admin/acl/role/',
    SAVEROLE_URL='/admin/acl/role/save',
    UPDATEROLE_URL='/admin/acl/role/update'
}

export const reqGetRole=(page:number,limit:number,rolename:string)=>request.get<any,GetRoleResponseData>(API.ROLELIST_URL + `${page}/${limit}/?roleName=${rolename}`)

export const reqSaveOrUpdateRole=(data:RoleData)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEROLE_URL,data);
    }else{
        return request.post<any,any>(API.SAVEROLE_URL,data);
    }
}
