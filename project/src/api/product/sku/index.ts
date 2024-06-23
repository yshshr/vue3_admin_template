import request from '@/utils/request';
import { GetSkuListResponseData,GetSkuInfoResponseData } from './type';

enum API{
    SKU_URL="/admin/product/list/",
    SKUSALE_URL="/admin/product/onSale/",
    SKUCANCELSALE_URL="/admin/product/cancelSale/",
    SKUINFO_URL="/admin/product/getSkuInfo/",
    DELETESKU_URL="/admin/product/deleteSku/"
}

export const reqSkuList =(page:number,limit:number)=> request.get<any,GetSkuListResponseData>(API.SKU_URL + `${page}/${limit}`);

export const reqSkuSale =(skuId:number)=> request.get<any,any>(API.SKUSALE_URL + `${skuId}`);

export const reqSkuCancelSale =(skuId:number)=> request.get<any,any>(API.SKUCANCELSALE_URL + `${skuId}`);

export const reqGetSkuInfo =(skuId:number)=> request.get<any,GetSkuInfoResponseData>(API.SKUINFO_URL + `${skuId}`);

export const reqRemoveSku =(skuId:number)=> request.delete<any,any>(API.DELETESKU_URL + `${skuId}`);