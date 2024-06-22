import request from '@/utils/request';
import { GetSkuListResponseData } from './type';

enum API{
    SKU_URL="/admin/product/list/",
    SKUSALE_URL="/admin/product/onSale/",
    SKUCANCELSALE_URL="/admin/product/cancelSale/",
}

export const reqSkuList =(page:number,limit:number)=> request.get<any,GetSkuListResponseData>(API.SKU_URL + `${page}/${limit}`);

export const reqSkuSale =(skuId:number)=> request.get<any,any>(API.SKUSALE_URL + `${skuId}`);

export const reqSkuCancelSale =(skuId:number)=> request.get<any,any>(API.SKUCANCELSALE_URL + `${skuId}`);

