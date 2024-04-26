import { createRouter, createWebHistory } from 'vue-router'

const auth = require('@/middleware/auth.js')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/MainApp.vue')
    },
    {
        path: '/auth',
        name: 'Login',
        component: () => import('@/components/common/LoginApp.vue')
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import('@/components/blog/MainBlog.vue'),
        children: [
            {
                path: 'post/:id',
                name: 'Post',
                component: () => import('@/components/common/PostShared.vue')
            }
        ]
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { requireAdmin: true },
        component: () => import('@/components/private/AdminDashboard.vue'),
        children: [
            {
                path: '',
                name: 'DashboardHome',
                meta: {requireAdmin: true},
                component: () => import('@/components/private/HomeDashboard.vue')
            },
            {
                path: 'posts',
                name: 'Posts',
                meta: { requireAdmin: true },
                component: () => import('@/components/private/AdminPosts.vue'),
                props: true
            },
            {
                path: 'analisis',
                name: 'Analisis',
                meta: { requireAdmin: true },
                component: () => import('@/components/private/AdminAnalits.vue'),
                props: true
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    if (to.meta.requireAdmin) {
        const token = auth.getTokenFromCookie();
        if(!await auth.isAdmin(token)){
            next({ name: 'Login' });
            return;
        }
    }

    if (to.meta.requireAuth) {
        const token = auth.getTokenFromCookie();
        if (!await auth.isAuthenticated(token)) {
            next({ name: 'Login' });
            return;
        }
    }

    next(); // Llamamos a next() aquí para permitir la navegación cuando sea adecuado
});




export {
    router
}