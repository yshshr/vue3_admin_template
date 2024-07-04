import request from "@/utils/request";
import { UserData,GetUserRoleResponseData,SetUserRoleData } from "./type";

enum API{
    USER_URL='/admin/acl/user/',
    SAVEUSER_URL='/admin/acl/user/save',
    UPDATEUSER_URL='/admin/acl/user/update',
    ALLUSERROLE_URL='/admin/acl/user/toAssign/',
    SETUSERROLE_URL='/admin/acl/user/doAssignRole',
    REMOVEUSER_URL='/admin/acl/user/remove/',
    BATCHREMOVEUSER_URL='/admin/acl/user/batchRemove'    
}

export const reqGetUserList = (page:number,limit:number,username:string)=>request.get<any,any>(API.USER_URL + `${page}/${limit}/?username=${username}`);

export const reqAddOrUpdateUser = (data:UserData)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEUSER_URL , data);
    }else{
        return request.post<any,any>(API.SAVEUSER_URL , data);
    }
}

export const reqGetAllUserRole = (userId:number)=>request.get<any,GetUserRoleResponseData>(API.ALLUSERROLE_URL + `${userId}`);

export const reqSetUserRole = (data:SetUserRoleData)=>request.post<any,any>(API.SETUSERROLE_URL,data);

export const reqRemoveUser = (userId:number)=>request.delete<any,any>(API.REMOVEUSER_URL + `${userId}`);

export const reqBatchRemoveUser = (idList:number[])=>request.delete(API.BATCHREMOVEUSER_URL,{data:idList});


