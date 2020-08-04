import Main from "@/components/main/main";


export default [
    {
        path: "/login",
        name: "login",
        meta: {
            hide: true,
            title: "登录"
        },
        component: () => import("@/views/login/login")
    },
    {
        path: "/",
        name: "Dashboard",
        redirect: '/workplace',
        component: Main,
        meta: {
            hide: false,
            title: "Dashboard",
            icon: "md-speedometer",
        },
        children: [
            {
                path: "/workplace",
                name: "workplace",
                meta: {
                    hide: false,
                    title: "工作台",
                    permission: ['admin']
                },
                component: () => import("@/views/Dashboard/workplace")
            },
        ]
    },
    {
        path: "/brief",
        name: "brief",
        component: Main,
        meta: {
            hide: false,
            title: "简叙",
            icon: "md-heart-outline",
            singlePage: true
        },
        children: [
            {
                path: "/brief/brief",
                name: "brief_brief",
                meta: {
                    hide: false,
                    title: "简叙",
                    icon: 'md-heart-outline'
                },
                component: () => import("@/views/brief/brief")
            }
        ]
    },
]