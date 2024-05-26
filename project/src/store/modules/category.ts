import {defineStore} from 'pinia'
import {reqGetCategory1,reqGetCategory2,reqGetCategory3} from '@/api/product/attr'
import {GetCategoryResponseData} from '@/api/product/attr/type'
import {CategoryState} from '@/store/modules/types/type'

let useCategoryStore = defineStore('CategoryStoreStore',{
    state: ():CategoryState=>{
        return {
            c1Arr:[],
            c1value:null,    
            c2Arr:[],
            c2value:null,
            c3Arr:[],
            c3value:null
        }
    },
    actions:{
        async getC1(){
            let result:GetCategoryResponseData = await reqGetCategory1();
            if(result.code==200){
                this.c1Arr = result.data;
             return 'ok';
            }else{
                 return Promise.reject(new Error(result.message as string));
            }
        },
        async getC2(){
            let result:GetCategoryResponseData = await reqGetCategory2(this.c1value);
            if(result.code==200){
                this.c2Arr = result.data;
             return 'ok';
            }else{
                 return Promise.reject(new Error(result.message as string));
            }
        }, 
        async getC3(){
            let result:GetCategoryResponseData = await reqGetCategory3(this.c2value);
            if(result.code==200){
                this.c3Arr = result.data;
             return 'ok';
            }else{
                 return Promise.reject(new Error(result.message as string));
            }
        }, 
    },
    getters:{

    }
})

export default useCategoryStore;