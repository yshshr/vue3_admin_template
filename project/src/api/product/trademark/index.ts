import request from '@/utils/request';
import type {GetTradeMarkResponseData} from '@/api/product/trademark/type.ts'

enum API {
    GETTRADEMARK_URL='/admin/product/baseTrademark/'
}

export const reqGetTradeMark=(page:number,limit:number)=>request.get<any,GetTradeMarkResponseData>(API.GETTRADEMARK_URL+`${page}/${limit}`);

