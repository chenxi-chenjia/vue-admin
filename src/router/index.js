import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [ {
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
        } ]
    },


]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [
    {
        path: '/userManage',
        component: Layout,
        name: 'UserManage',
        redirect: 'noredirect',
        meta: {
            title: '用户管理',
            icon: 'lock',
            roles: [ 'admin' ],
        },
        children: [
            {
                path: 'teacherManage',
                name: 'TeacherManage',
                component:() => import('@/views/manage'),
                redirect: '/userManage/teacherManage/index',
                meta: { title: '员工管理' },
                children: [
                    {
                        path: 'index',
                        component: () => import('@/views/manage/teacherManage/teacherList'),
                        meta: {
                            title: '员工管理',
                        }
                    },
                    {
                        name: 'AddTeacher',
                        path: 'addTeacher',
                        component: () => import('@/views/manage/teacherManage/addTeacher'),
                        hidden: true,
                        meta: {
                            title: '添加员工',
                            icon: ''
                        }
                    },{
                        name: 'UpdateTeacher',
                        path: 'updateTeacher',
                        component: () => import('@/views/manage/teacherManage/updateTeacher'),
                        hidden: true,
                        meta: {
                            title: ' 修改员工信息',
                            icon: ''
                        }
                    },
                ]
            },
            {
                path: 'studentManage',
                name: 'StudentManage',
                redirect: '/userManage/studentManage/index',
                component:() => import('@/views/manage'),
                meta: {
                    title: '学员管理'
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('@/views/manage/userManage'),
                        meta: {
                            title: '学生管理',
                        }
                    },
                    {
                        name: 'AddStudent',
                        path: 'addStudent',
                        component: () => import('@/views/manage/userManage'),
                        hidden: true,
                        meta: {
                            title: '添加学员',
                            icon: ''
                        }
                    },
                ]
            },
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
]

