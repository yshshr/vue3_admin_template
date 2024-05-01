import {defineStore} from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore',{
    state: ()=>{
        return {
            fold:true,
        }
    },
})

export default useLayOutSettingStore;