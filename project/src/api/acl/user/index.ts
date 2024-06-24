import request from "@/utils/request";

enum API{
    USER_URL='/admin/acl/user/'
}

export const reqGetUserList = (page:number,limit:number)=>request.get<any,any>(API.USER_URL + `${page}/${limit}`);



