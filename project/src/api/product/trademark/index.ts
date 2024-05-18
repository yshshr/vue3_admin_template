import request from '@/utils/request';


enum API {
    GETTRADEMARK_URL='/admin/product/baseTrademark/'
}

export const reqGetTradeMark=(page:number,limit:number)=>request.get<any,any>(API.GETTRADEMARK_URL+`${page}/${limit}`);

