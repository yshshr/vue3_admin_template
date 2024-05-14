import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import pinia from './store'
import setting from '@/setting';


nprogress.configure({ showSpinner: false });

let userStore = useUserStore(pinia);
console.log(userStore);


router.beforeEach(async(to, from) => {
    // console.log(to.fullPath)
    document.title = `${setting.title} - ${to.meta.title}`;
    nprogress.start();
    userStore.token;
    if(userStore.token){
        if(to.name==='login'){
            console.log(to.name);
            return {path:'/'};
        }else{
            if(!userStore.username){
                try{
                    await userStore.getUserInfo();
                }catch(error){
                    userStore.userlogout();
                    return {name:'login',query:{redirect:to.path}};
                }
            }
        }
    }else{
        // 未登录
        if(to.name!=='login'){
            return {name:'login',query:{redirect:to.path}};
        }
    }
    //return false
})

router.afterEach((to, from) => {
    nprogress.done();
})

