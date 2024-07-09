import request from "@/utils/request";
import type{GetAllPermissionResponseData} from './type'

enum API{
    ALLPERMISSION_URL='/admin/acl/permission'
}

export const reqGetAllPermission=()=>request.get<any,GetAllPermissionResponseData>(API.ALLPERMISSION_URL)

