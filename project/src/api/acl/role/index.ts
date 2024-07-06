import request from "@/utils/request";
import type{GetRoleResponseData, RoleData,GetRoleMenuResponseData,SetRoleMenuRequestData} from './type'

enum API{
    ROLELIST_URL='/admin/acl/role/',
    SAVEROLE_URL='/admin/acl/role/save',
    UPDATEROLE_URL='/admin/acl/role/update',
    ROLEMENU_URL='/admin/acl/permission/toAssign/',
    SETROLEMENU_URL='/admin/acl/permission/doAssignAcl',
    REMOVEROLE_URL='/admin/acl/role/remove/'

}

export const reqGetRole=(page:number,limit:number,rolename:string)=>request.get<any,GetRoleResponseData>(API.ROLELIST_URL + `${page}/${limit}/?roleName=${rolename}`)

export const reqSaveOrUpdateRole=(data:RoleData)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEROLE_URL,data);
    }else{
        return request.post<any,any>(API.SAVEROLE_URL,data);
    }
}

export const reqGetRoleMenu=(roleId:number)=>request.get<any,GetRoleMenuResponseData>(API.ROLEMENU_URL + `${roleId}`)

export const reqSetRoleMenu=(data:SetRoleMenuRequestData)=>request.post<any,any>(API.SETROLEMENU_URL,data)

export const reqRemoveRole=(roleId:number)=>request.delete<any,any>(API.REMOVEROLE_URL + `${roleId}`)