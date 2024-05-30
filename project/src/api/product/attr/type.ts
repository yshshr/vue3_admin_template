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

export interface GetAttrInfoListResponseData extends ResponseData{
    data: AttrInfo[]
}

export interface AttrInfo {
    id: Number|null,
    attrName: String,
    updateTime: String,
    createTime: String,
    categoryId: Number|null,
    categoryLevel:Number,
    attrValueList: attrValue[]
}

export interface attrValue {
    id: Number|null,
    valueName: String,
    updateTime: String,
    createTime: String,
    attrId: Number|null,
    isLook: Boolean
}











