export interface loginForm{
    username:String,
    password:String
}

interface dataType{
    token?:String
    message?:String
}

export interface loginResponseData{
    code:Number,
    data:dataType
}


interface userInfo{
    userId:Number,
    avatar:String,
    username:String,
    password:String,
    desc:String,
    roles:String[],
    buttons:String[],
    routes:String[],
    token:String
}

interface user{
    checkUser:userInfo
}


export interface userResponseData{
    code:Number,
    data:user
}