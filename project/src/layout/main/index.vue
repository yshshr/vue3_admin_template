<template>
    
    <!-- <router-link to="/">Go to Home</router-link>
    <router-link to="/product/sku">Go to sku</router-link> -->
    <router-view v-slot="{Component}">
        <Transition name="fade">
            <component :is="Component"></component>
        </Transition>
    </router-view>
</template>

<script setup lang=ts>

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