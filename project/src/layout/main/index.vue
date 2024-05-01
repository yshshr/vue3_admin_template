<template>
    
    <!-- <router-link to="/">Go to Home</router-link>
    <router-link to="/product/sku">Go to sku</router-link> -->
    <router-view v-slot="{Component}">
        <Transition name="fade">
            <component :is="Component" v-if="flag"></component>
        </Transition>
    </router-view>
</template>

<script setup lang=ts>
import {watch,ref,nextTick} from 'vue'
import useLayOutSettingStore from '@/store/modules/setting';

let layOutSettingStore = useLayOutSettingStore();
let flag = ref(true);

watch(()=>layOutSettingStore.refresh,()=>{
    flag.value=false;
    nextTick(()=>{
        flag.value=true;
    })

})


</script>

<style scoped>
.fade-enter-from{
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active{
    transition: all 1s;
}

.fade-enter-to{
    opacity: 1;
    transform: scale(1);
}

</style>