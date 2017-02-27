/**
 * Created by SkyeTang on 2016/12/5.
 */
export default  [
    {
        path: '/demo',
        component: resolve => require(['../src/demo/app'], resolve)
    },
    {
        path: '/validate',
        component: resolve => require(['../src/validate'], resolve)
    },
    {
    	path: '/list',
        component: resolve => require(['../src/list'], resolve)
    }
]
