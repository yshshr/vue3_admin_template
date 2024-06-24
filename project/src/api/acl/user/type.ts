export interface ResponseData{
    code: number,
    message: string,
    ok: boolean
}

export interface UserData{
    id?: number,
    createTime?: string,
    updateTime?: string,
    username: string,
    password: string,
    name: string,
    phone: string,
    roleName:string
}

export interface GetUserResponseData extends ResponseData{
    data:{
        records:UserData[],
        total: number,
        size: number,
        current: number,
        pages: number
    }
}