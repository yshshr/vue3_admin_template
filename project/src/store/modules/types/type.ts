import { RouteRecordRaw } from "vue-router"
import { CategoryObj } from "@/api/product/attr/type"

export interface UserState{
    token:String|null
    menuRoutes:RouteRecordRaw[]
    username:String
    avatar:String
}

export interface CategoryState{
    c1Arr:CategoryObj[]
    c1value:number|null
    c2Arr:CategoryObj[]
    c2value:number|null
    c3Arr:CategoryObj[]
    c3value:number|null
}

