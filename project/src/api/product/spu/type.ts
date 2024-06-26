export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface GetSpuResponseData extends ResponseData{
    data:{
        records: SpuData[],
        total: number,
        size: number,
        current: number,
        orders: Array<any>,
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number
    }
}

export interface SpuData {
    id?: number|null,
    createTime?: string,
    updateTime?: string,
    spuName: string,
    description: string,
    category3Id: number|null,
    tmId: number|null,
    spuSaleAttrList: SpuSaleAttrData[]|null,
    spuImageList: SpuImageData[]|null,
    spuPosterList: null
}

export interface GetAllTradeMarkResponseData extends ResponseData{
    data:AllTradeMarkData[]
}

export interface AllTradeMarkData {
    id: number,
    createTime: string,
    updateTime: string,
    tmName: string,
    logoUrl: string
}

export interface GetSpuImageListResponseData extends ResponseData{
    data:SpuImageData[]
}

export interface SpuImageData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    imgName: string,
    imgUrl: string,
    spuId?: number
}

export interface GetSpuSaleAttrListResponseData extends ResponseData{
    data:SpuSaleAttrData[]
}

export interface SpuSaleAttrData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    baseSaleAttrId: number,
    saleAttrName: string,
    spuId?: number,
    spuSaleAttrValueList: SpuSaleAttrValueData[],
    flag?:boolean,
    saleAttrValue?:string
}

export interface SpuSaleAttrValueData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    isChecked?: string
    baseSaleAttrId: number,
    saleAttrName?: string,
    saleAttrValueName?: string,
    spuId?: number
}

export interface GetAllSaleAttrListResponseData extends ResponseData{
    data:AllSaleAttrData[]
}

export interface AllSaleAttrData {
    id: number,
    createTime: string,
    updateTime: string,
    name: string
}

export interface SkuAttrValueData {
    attrId: number,
    valueId: number,
}

export interface SkuSaleAttrValueData {
    saleAttrId: number,
    saleAttrValueId: number,
}

export interface SkuData {
    category3Id: number|null,
    spuId: number|null,
    skuName: string,
    price: number|null,
    weight: number|null,
    skuDesc: string,
    skuAttrValueList: SkuAttrValueData[],
    skuSaleAttrValueList: SkuSaleAttrValueData[],
    skuDefaultImg: string
}


export interface GetSkuListResponseData extends ResponseData{
    data:SkuData[]
}



