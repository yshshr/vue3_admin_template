export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface GetCategoryResponseData extends ResponseData{
    data: CategoryObj[]
}

export interface CategoryObj {
    id: Number|null,
    name: String,
    updateTime: String,
    createTime: String,
    category1Id?: Number,
    category2Id?: Number,
}













