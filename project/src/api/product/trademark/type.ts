export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface GetTradeMarkResponseData extends ResponseData{
    data: {
        records: record[],
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}

export interface record {
    id?: Number,
    createTime: String,
    updateTime: String,
    tmName: String,
    logoUrl: String
}













