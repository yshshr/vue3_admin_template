import request from "@/utils/request";
import { UserData,GetUserRoleResponseData } from "./type";

enum API{
    USER_URL='/admin/acl/user/',
    SAVEUSER_URL='/admin/acl/user/save',
    UPDATEUSER_URL='/admin/acl/user/update',
    ALLUSERROLE_URL='/admin/acl/user/toAssign/'    
}

export const reqGetUserList = (page:number,limit:number)=>request.get<any,any>(API.USER_URL + `${page}/${limit}`);

export const reqAddOrUpdateUser = (data:UserData)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEUSER_URL , data);
    }else{
        return request.post<any,any>(API.SAVEUSER_URL , data);
    }
}

export const reqGetAllUserRole = (userId:number)=>request.get<any,GetUserRoleResponseData>(API.ALLUSERROLE_URL + `${userId}`);



