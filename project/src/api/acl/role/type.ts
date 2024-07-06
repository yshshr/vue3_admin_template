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

export interface RoleMenuData{
    id:number,
    createTime:string,
    updateTime:string,
    pid: number,
    name: string,
    code: string,
    toCode: string,
    type: number,
    status: null,
    level: number,
    children: RoleMenuData[],
    select: boolean
}

export interface GetRoleMenuResponseData extends ResponseData{
    data:RoleMenuData[]
}

export interface SetRoleMenuRequestData{
    roleId:number,
    permissionIdList:number[]
}

