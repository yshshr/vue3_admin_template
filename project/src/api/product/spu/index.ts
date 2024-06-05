import request from '@/utils/request';
import { GetSpuResponseData } from './type';


enum API {
    GETSPU_URL='/admin/product/'
}

export const reqGetSpu=(page:number,limit:number,c3:number|null)=>request.get<any,GetSpuResponseData>(API.GETSPU_URL+`${page}/${limit}?category3Id=${c3}`);
