import { RouteRecordRaw } from "vue-router"

export interface UserState{
    token:String|null
    menuRoutes:RouteRecordRaw[]
}