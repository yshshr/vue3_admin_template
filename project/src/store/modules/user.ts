import {defineStore} from 'pinia'
import {reqLogin} from '@/api/user/index.ts'
import {loginForm,loginResponseData} from '@/api/user/type.ts'
import {UserState} from '@/store/modules/types/type.ts'
import {SET_TOKEN,GET_TOKEN} from '@/utils/token.ts'
import {constantRoutes} from '@/router/routes'



let useUserStore = defineStore('User',{
    state: ():UserState=>{
        return {
            token:GET_TOKEN(),
            menuRoutes:constantRoutes
        }
    },
    actions:{
        async userlogin(data : loginForm){
           let result:loginResponseData = await reqLogin(data);
           if(result.code==200){
            this.token = result.data.token as string;
            SET_TOKEN(result.data.token as string);
            return 'ok';
           }else{
                return Promise.reject(new Error(result.data.message as string));
           }
        }
    },
    getters:{

    }
})

export default useUserStore;