export const constantRoutes=[
    // {
    //     path:'/login',
    //     component:()=> import('@/views/login/index.vue'),
    //     name:'login',
    //     meta:{
    //         title:'登录',
    //         ishidden:false,
    //         icon:'Search'
    //     }
    // },
    // {
    //     path:'/',
    //     //component:()=> import('@/views/home/index.vue'),
    //     component:()=> import('@/layout/index.vue'),
    //     name:'layout',
    //     meta:{
    //         title:'首页',
    //         ishidden:false,
    //         icon:'HomeFilled'
    //     },
    //     children:[
    //         {
    //             path:'/home',
    //             component:()=> import('@/views/home/index.vue'),
    //             name:'layout',
    //             meta:{
    //                 title:'首页',
    //                 ishidden:false,
    //                 icon:'Avatar'
    //             }
    //         },
    //         {
    //             path:'/home',
    //             component:()=> import('@/views/home/index.vue'),
    //             name:'layout',
    //             meta:{
    //                 title:'二级菜单',
    //                 ishidden:false,
    //                 icon:'UserFilled'
    //             }
    //         }
    //     ]
    // },
    {
        path:'/',
        component:()=> import('@/layout/index.vue'),
        name:'layout',
        meta:{
            title:'首页',
            ishidden:false,
            icon:'HomeFilled'
        },
    },
    {
        path:'/screen/:id',
        component:()=> import('@/views/screen/index.vue'),
        name:'Screen',
        meta:{
            title:'数据大屏',
            ishidden:false,
            icon:'Platform'
        }
    },
    {
        path:'/acl',
        component:()=> import('@/layout/index.vue'),
        name:'Acl',
        meta:{
            title:'权限管理',
            ishidden:false,
            icon:'Lock'
        },
        children:[
            {
                path:'/acl/user',
                component:()=> import('@/views/acl/user/index.vue'),
                name:'User',
                meta:{
                    title:'用户管理',
                    ishidden:false,
                    icon:'User'
                },
            },
            {
                path:'/acl/role',
                component:()=> import('@/views/acl/role/index.vue'),
                name:'Role',
                meta:{
                    title:'角色管理',
                    ishidden:false,
                    icon:'UserFilled'
                },
            },
            {
                path:'/acl/permission',
                component:()=> import('@/views/acl/permission/index.vue'),
                name:'Permission',
                meta:{
                    title:'菜单管理',
                    ishidden:false,
                    icon:'Monitor'
                },
            }
        ]
    },
    {
        path:'/product',
        component:()=> import('@/layout/index.vue'),
        name:'Product',
        meta:{
            title:'商品管理',
            icon:'Goods'
        },
        children:[
            {
                path:'/product/trademark',
                component:()=> import('@/views/product/trademark/index.vue'),
                name:'Trademark',
                meta:{
                    title:'品牌管理',
                    icon:'ShoppingCartFull'
                },
            },
            {
                path:'/product/attr',
                component:()=> import('@/views/product/attr/index.vue'),
                name:'Attr',
                meta:{
                    title:'属性管理',
                    icon:'Box'
                },
            },
            {
                path:'/product/spu',
                component:()=> import('@/views/product/spu/index.vue'),
                name:'Spu',
                meta:{
                    title:'SPU管理',
                    icon:'Calendar'
                },
            },
            {
                path:'/product/sku',
                component:()=> import('@/views/product/sku/index.vue'),
                name:'Sku',
                meta:{
                    title:'SKU管理',
                    icon:'Orange'
                },
            }
        ]
    },
    {
        path:'/404',
        component:()=> import('@/views/404/index.vue'),
        name:'404',
        meta:{
            title:'404',
            ishidden:true,
            icon:'Refresh'
        }
    },
    {
        path:'/:pathMatch(.*)*',
        redirect:'/404',
        name:'any',
        meta:{
            title:'任意路由',
            ishidden:true,
            icon:'Grid'
        }
    },
]