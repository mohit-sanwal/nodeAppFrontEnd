import Vue from "vue";
import Router from "vue-router";

import store from "./store";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: () => import(/* webpackChunkName: "Layout" */ "./components/Layout.vue"),
            children: [
                {
                    path: "/",
                    name: "Dashboard",
                    component: () => import(/* webpackChunkName: "Dashboard" */ "./views/Dashboard.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "/all-users",
                    name: "AllUsers",
                    component: () => import(/* webpackChunkName: "AllUsers" */ "./views/AllUsers.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "/feeds",
                    name: "GetAllFeeds",
                    component: () => import(/* webpackChunkName: "GetAllFeeds" */ "./views/GetAllFeeds.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "/add-post",
                    name: "Post",
                    component: () => import(/* webpackChunkName: "Post" */ "./views/Post.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "/my-post",
                    name: "MyPost",
                    component: () => import(/* webpackChunkName: "MyPost" */ "./views/MyPost.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "/about",
                    name: "About",
                    component: () => import(/* webpackChunkName: "About" */ "./views/About.vue"),
                    meta: {
                        requiresAuth: true,
                    },
                },
            ],
        },
        {
            path: "/login",
            name: "Login",
            component: () => import(/* webpackChunkName: "Login" */ "./views/Login.vue"),
            beforeEnter: (to, from, next) => {
                if (store.getters.loggedIn) {
                    if (to.query.back) {
                        next({ path: to.query.back });
                    } else {
                        next({ path: "/" });
                    }
                } else {
                    next();
                }
            },
        },
        {
            path: "/register",
            name: "Register",
            component: () => import(/* webpackChunkName: "Login" */ "./views/Register.vue"),
            beforeEnter: (to, from, next) => {
                if (store.getters.loggedIn) {
                    if (to.query.back) {
                        next({ path: to.query.back });
                    } else {
                        next({ path: "/" });
                    }
                } else {
                    next();
                }
            },
        },
        // {
        //     path: "*",
        //     name: "PageNotFound",
        //     component: () => import(/* webpackChunkName: "PageNotFound" */ "./views/PageNotFound.vue"),
        // },
    ],
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (store.getters.loggedIn) {
//             debugger
//             next();
//         } else {
//             next({
//                 path: "/login",
//                 query: { back: to.fullPath },
//             });
//         }
//     } else {
//         next();
//     }
// });

export default router;
