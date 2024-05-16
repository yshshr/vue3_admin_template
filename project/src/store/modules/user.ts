import {defineStore} from 'pinia'
import {reqLogin,reqUserInfo,reqLogout} from '@/api/user/index.ts'
import {loginForm,loginResponseData,userResponseData} from '@/api/user/type.ts'
import {UserState} from '@/store/modules/types/type.ts'
import {SET_TOKEN,GET_TOKEN,REMOVE_TOKEN} from '@/utils/token.ts'
import {constantRoutes} from '@/router/routes'



let useUserStore = defineStore('User',{
    state: ():UserState=>{
        return {
            token:GET_TOKEN(),
            menuRoutes:constantRoutes,
            username:'',
            avatar:''
        }
    },
    actions:{
        async userlogin(data : loginForm){
           let result:loginResponseData = await reqLogin(data);
           if(result.code==200){
            this.token = result.data as string;
            SET_TOKEN(result.data as string);
            return 'ok';
           }else{
                return Promise.reject(new Error(result.message as string));
           }
        },
        async getUserInfo(){
            let result:userResponseData = await reqUserInfo();
            if(result.code==200){
                this.username = result.data.name;
                this.avatar = result.data.avatar;
                return 'ok';
            }else{
                return Promise.reject(new Error(result.message as string));
            }
         },
         async userlogout(){
            let result:loginResponseData = await reqLogout()
            if(result.code==200){
                this.username = '';
                this.avatar = '';
                this.token = '';
                REMOVE_TOKEN();
                return 'ok';
            }else{
                return Promise.reject(new Error(result.message as string));
            }
         }
    },
    getters:{

    }
})

export default useUserStore;