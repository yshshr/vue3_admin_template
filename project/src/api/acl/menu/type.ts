export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}


export interface PermissionData{
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
    children: PermissionData[],
    select: boolean
}

export interface GetAllPermissionResponseData extends ResponseData{
    data:PermissionData[]
}


