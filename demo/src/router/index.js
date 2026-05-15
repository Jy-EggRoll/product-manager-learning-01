import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/overview'
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import('@/views/Overview.vue'),
    meta: { title: '项目概览', icon: 'LayoutDashboard' }
  },
  {
    path: '/hq-dashboard',
    name: 'HQDashboard',
    component: () => import('@/views/HQDashboard.vue'),
    meta: { title: '总部运营Dashboard', icon: 'BarChart3' }
  },
  {
    path: '/store-dashboard',
    name: 'StoreDashboard',
    component: () => import('@/views/StoreDashboard.vue'),
    meta: { title: '门店店长工作台', icon: 'Store' }
  },
  {
    path: '/agent-chat',
    name: 'AgentChat',
    component: () => import('@/views/AgentChat.vue'),
    meta: { title: '智能体交互演示', icon: 'Bot' }
  },
  {
    path: '/flowcharts',
    name: 'Flowcharts',
    component: () => import('@/views/Flowcharts.vue'),
    meta: { title: '业务流程图', icon: 'GitBranch' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 药房智能体解决方案` : '药房智能体解决方案'
  next()
})

export default router
