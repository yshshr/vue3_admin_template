export interface ResponseData{
    code: number,
    message: string,
    ok: boolean
}

export interface SkuAttrValueData {
    attrId: number,
    valueId: number,
    id?:number,
    valueName:string
}

export interface SkuSaleAttrValueData {
    saleAttrId: number,
    saleAttrValueId: number,
    id?:number,
    saleAttrValueName:string
}

export interface SkuData {
    category3Id?: number|null,
    spuId?: number|null,
    skuName?: string,
    price?: number|null,
    weight?: number|null,
    skuDesc?: string,
    skuAttrValueList?: SkuAttrValueData[],
    skuSaleAttrValueList?: SkuSaleAttrValueData[],
    skuDefaultImg?: string,
    isSale?:number,
    id?:number
}

export interface GetSkuListResponseData extends ResponseData {
    data:{
        records:SkuData[],
        total: number,
        size: number,
        current: number,
        orders: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number
    }
}

export interface GetSkuInfoResponseData extends ResponseData {
    data:SkuData
}