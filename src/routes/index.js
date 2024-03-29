import { createRouter, createWebHashHistory } from 'vue-router'

const auth = require('../middleware/auth.js')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/MainApp.vue')
    },
    {
        path: '/auth',
        name: 'Login',
        meta: {requireAuth: true},
        component: () => import('../components/common/LoginApp.vue')
    },
    {
        path: '/main',
        name: 'Main',
        meta: {requireAuth: true},
        component: () => import('../components/blog/MainBlog.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {

    if(to.meta.requireAuth && !auth.isAuthenticated(auth.getTokenFromCookie())){
        next({name: 'Login'})
    }
    else{
        next()
    }
})

export {
    router
}