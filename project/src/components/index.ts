import SvgIcon from './svgIcon/index.vue'
import type { App, Component } from 'vue';
import * as ElemenyPlusIconsVue from '@element-plus/icons-vue'

console.log(ElemenyPlusIconsVue);

const allGloablComponent: { [name: string]: Component } ={ SvgIcon };
export default {
    install(app: App) {
        Object.keys(allGloablComponent).forEach((key:string) => {
            app.component(key, allGloablComponent[key]);
        });
        for(const [key,iconsvalue] of Object.entries(ElemenyPlusIconsVue)){
            app.component(key, iconsvalue);
        }
    }
}