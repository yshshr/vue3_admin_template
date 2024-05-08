import { RouteRecordRaw } from "vue-router"

export interface UserState{
    token:String|null
    menuRoutes:RouteRecordRaw[]
    username:String
    avatar:String
}