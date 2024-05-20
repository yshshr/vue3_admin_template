import request from '@/utils/request';
import type {GetTradeMarkResponseData,record} from '@/api/product/trademark/type.ts'

enum API {
    GETTRADEMARK_URL='/admin/product/baseTrademark/',
    ADDTRADEMARK_URL='/admin/product/baseTrademark/save',
    EDITTRADEMARK_URL='/admin/product/baseTrademark/update'
}

export const reqGetTradeMark=(page:number,limit:number)=>request.get<any,GetTradeMarkResponseData>(API.GETTRADEMARK_URL+`${page}/${limit}`);

export const reqAddOrUpdateTradeMark=(data:record)=>{
    if(data.id){
        request.post<any,any>(API.EDITTRADEMARK_URL,data);
    }else{
        request.post<any,any>(API.ADDTRADEMARK_URL,data);
    }
}
