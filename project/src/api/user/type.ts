export interface loginFormData {
    username: String,
    password: String
}

export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface loginResponseData extends ResponseData{
    data: string
}

export interface userResponseData extends ResponseData{
    data: {
        routes: string[],
        buttons: string[],
        roles: string[],
        name: string,
        avatar: string
    }
}

export interface userInfo {
    userId: Number,
    avatar: String,
    username: String,
    password: String,
    desc: String,
    roles: String[],
    buttons: String[],
    routes: String[],
    token: String
}




