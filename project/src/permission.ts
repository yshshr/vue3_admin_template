import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from) => {
    // console.log(to.fullPath)
    nprogress.start();
    //return false
})

router.afterEach((to, from) => {
    nprogress.done();
})

