import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from "view-design";
import { getToken, setToken,setTitle } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)

const router = new Router({
    routes,
    mode: 'history'
})

const LOGIN_PAGE_NAME = 'login'

/*
* to跳转页面
* access用户权限值roleIds
* routes获取当前页面roleId => route.meta.access
* */
const turnTo = (to,access,next)=>{
    if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
    else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to,from,next)=>{
    iView.LoadingBar.start()
    const token = getToken()
    if(!token && to.name !==LOGIN_PAGE_NAME){
        // 未登录且要跳转的页面不是登录页
        next({
            name:LOGIN_PAGE_NAME // 跳转到登录页
        })
    }else if(!token && t.name===LOGIN_PAGE_NAME){
        // 未登录且跳转的页面是登录页
        next()
    }else if(token && to.name===LOGIN_PAGE_NAME){
        next({
            name:homeName
        })
    }else {
        if (store.state.user.hasGetInfo) {
            turnTo(to, store.state.user.access, next)
        } else {
            store.dispatch('getUserInfo').then(user => {
                turnTo(to, user.access, next)
            }).catch(() => {
                setToken('')
                next({
                    name: 'login'
                })
            })
        }
    }
})

router.afterEach(to=>{
    setTitle(to, router.app)
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default  router