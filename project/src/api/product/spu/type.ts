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
    id: Number|null,
    createTime: string,
    updateTime: string,
    spuName: string,
    description: string,
    category3Id: number,
    tmId: number,
    spuSaleAttrList: null,
    spuImageList: null,
    spuPosterList: null
}