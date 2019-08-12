import Vue from 'vue'
import Router from 'vue-router'
import { isNULL } from 'common/js/util'

Vue.use(Router)

const ServerLose = () => import('components/lose/ServerLose')
// 主页
const Index = () => import('components/index/Index')
// 登陆
const Login = () => import('components/login/Login')
// 注销
const Logout = () => import('components/login/Logout')
// 导航
const Nav = () => import('components/nav/Nav')
// 列表 demo
const Dept = () => import('components/sys/dept/Dept')
// form demo
const Form = () => import('components/form/Form')
// 文件上传demo
const Upload = () => import('components/form/UploadDemo')
// 下载
const Download = () => import('components/form/DownloadDemo')

const Tree = () => import('components/tree/TreeDemo')

//用户管理页面
const SysAccount = () => import('components/sys/account/SysAccount')

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: Index,
            children: [
                {
                    path: '/SysAccount',
                    component: SysAccount
                },
                {
                    path: '/form',
                    component: Form
                },
                {
                    path: '/upload',
                    component: Upload
                },
                {
                    path: '/download',
                    component: Download
                },
                {
                    path: '/tree',
                    component: Tree
                },
                {
                    path: '/dept',
                    component: Dept
                },
                {
                    path: '/menu/tree',
                    component: Tree
                }
            ]
        },
        {
            path: '/Nav',
            component: Nav
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/logout',
            component: Logout
        },
        {
            path: '/lose/:id',
            component: ServerLose
        },
        {
            path: '/*',
            redirect: '/lose/0'
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    if (isNULL(token) && to.path !== '/login') {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
})

export default router
