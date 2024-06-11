import request from '@/utils/request';
import { SpuData,GetSpuResponseData,GetAllTradeMarkResponseData,GetSpuImageListResponseData,GetSpuSaleAttrListResponseData,GetAllSaleAttrListResponseData } from './type';


enum API {
    GETSPU_URL='/admin/product/',
    GETALLTRADEMARK_URL='/admin/product/baseTrademark/getTrademarkList',
    GETSPUIMAGELIST_URL='/admin/product/spuImageList/',
    GETSPUSALEATTRLIST_URL='/admin/product/spuSaleAttrList/',
    GETALLSALEATTRLIST_URL ='/admin/product/baseSaleAttrList',
    SAVESPU_URL ='/admin/product/saveSpuInfo',
    UPDATESPU_URL ='/admin/product/updateSpuInfo'
}

export const reqGetSpu=(page:number,limit:number,c3:number|null)=>request.get<any,GetSpuResponseData>(API.GETSPU_URL+`${page}/${limit}?category3Id=${c3}`);

export const reqGetAllTradeMark=()=>request.get<any,GetAllTradeMarkResponseData>(API.GETALLTRADEMARK_URL);

export const reqGetSpuImageList=(spuId:number|null)=>request.get<any,GetSpuImageListResponseData>(API.GETSPUIMAGELIST_URL + `${spuId}`);

export const reqGetSpuSaleAttrList=(spuId:number|null)=>request.get<any,GetSpuSaleAttrListResponseData>(API.GETSPUSALEATTRLIST_URL + `${spuId}`);

export const reqGetAllSaleAttrList=()=>request.get<any,GetAllSaleAttrListResponseData>(API.GETALLSALEATTRLIST_URL);

export const reqSaveOrUpdateSpu=(data:SpuData)=>{
    if(data.id){
        request.post<any,any>(API.UPDATESPU_URL,data);
    }else{
        request.post<any,any>(API.SAVESPU_URL,data);
    }
}