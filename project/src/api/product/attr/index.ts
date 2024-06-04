import request from '@/utils/request';
import {GetCategoryResponseData,GetAttrInfoListResponseData,AttrInfo} from './type'

enum API {
    GETCATEGORY1_URL='/admin/product/getCategory1',
    GETCATEGORY2_URL='/admin/product/getCategory2/',
    GETCATEGORY3_URL='/admin/product/getCategory3/',
    GETATTRINFOLIST_URL='/admin/product/attrInfoList/',
    SAVEORUPDATEATTRINFO_URL = '/admin/product/saveAttrInfo',
    DELETEATTR_URL='/admin/product/deleteAttr/'
}

export const reqGetCategory1=()=>request.get<any,GetCategoryResponseData>(API.GETCATEGORY1_URL);

export const reqGetCategory2=(c1:number|null)=>request.get<any,GetCategoryResponseData>(API.GETCATEGORY2_URL+`${c1}`);

export const reqGetCategory3=(c2:number|null)=>request.get<any,GetCategoryResponseData>(API.GETCATEGORY3_URL+`${c2}`);

export const reqAttrInfoList=(c1:number|null,c2:number|null,c3:number|null)=>request.get<any,GetAttrInfoListResponseData>(API.GETATTRINFOLIST_URL+`${c1}/${c2}/${c3}`);

export const reqSaveOrUpdateAttrInfo=(data:AttrInfo)=>request.post<any,any>(API.SAVEORUPDATEATTRINFO_URL,data);

export const reqDeleteAttr=(attrId:number)=>request.delete<any,any>(API.DELETEATTR_URL + `${attrId}`);



