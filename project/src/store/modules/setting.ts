import {defineStore} from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore',{
    state: ()=>{
        return {
            fold:true,
            refresh:false
        }
    },
})

export default useLayOutSettingStore;