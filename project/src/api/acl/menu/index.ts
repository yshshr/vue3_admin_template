import request from "@/utils/request";
import type{GetAllPermissionResponseData,SavePermissionBody} from './type'

enum API{
    ALLPERMISSION_URL='/admin/acl/permission',
    SAVEPERMISSION_URL='/admin/acl/permission/save',
    UPDATEPERMISSION_URL='/admin/acl/permission/update',
    REMOVEPERMISSION_URL='/admin/acl/permission/remove/'
}

export const reqGetAllPermission=()=>request.get<any,GetAllPermissionResponseData>(API.ALLPERMISSION_URL)

export const reqSaveOrUpdatePermission=(data:SavePermissionBody)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEPERMISSION_URL,data);
    }else{
        return request.post<any,any>(API.SAVEPERMISSION_URL,data);
    }
}

export const reqRemovePermission=(id:number)=>request.delete<any,any>(API.REMOVEPERMISSION_URL + `${id}`);

