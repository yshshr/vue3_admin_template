export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

export interface RoleData{
    id?:number,
    createTime?:string,
    updateTime?:string,
    roleName:string,
    remark?:null,
}

export interface GetRoleResponseData extends ResponseData{
    data:{
        records:RoleData[],
        total:number,
        size:number,
        current:number,
        orders:[],
        optimizeCountSql:boolean,
        hitCount:boolean,
        countId:null,
        maxLimit:null,
        searchCount:boolean,
        pages:number
    }
}
