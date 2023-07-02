// This file is automatically generated by gen-router.js, please do not modify it manually！
import VueRouter from 'vue-router'
import Vue from 'vue'
const packageInfo = require('../package.json')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { description: '首页' },
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
  },
  {
    path: '/set-height',
    name: 'setHeight',
    meta: { description: '固定高度的表格' },
    component: () => import(/* webpackChunkName: "setHeight" */ '@/views/set-height.vue'),
  },
  {
    path: '/sticky-basic',
    name: 'stickyBasic',
    meta: { description: '[sticky-header] 基础表格' },
    component: () => import(/* webpackChunkName: "stickyBasic" */ '@/views/sticky-basic.vue'),
  },
  {
    path: '/sticky-basic1',
    name: 'stickyBasic1',
    meta: { description: '[sticky-header] 基础表格（局部注册指令）' },
    component: () => import(/* webpackChunkName: "stickyBasic1" */ '@/views/sticky-basic1.vue'),
  },
  {
    path: '/sticky-expand',
    name: 'stickyExpand',
    meta: { description: '[sticky-header] 展开行表格' },
    component: () => import(/* webpackChunkName: "stickyExpand" */ '@/views/sticky-expand.vue'),
  },
  {
    path: '/sticky-filter',
    name: 'stickyFilter',
    meta: { description: '[sticky-header] 筛选' },
    component: () => import(/* webpackChunkName: "stickyFilter" */ '@/views/sticky-filter.vue'),
  },
  {
    path: '/sticky-fixed-col',
    name: 'stickyFixedCol',
    meta: { description: '[sticky-header] 固定列表格' },
    component: () => import(/* webpackChunkName: "stickyFixedCol" */ '@/views/sticky-fixed-col.vue'),
  },
  {
    path: '/sticky-merge',
    name: 'stickyMerge',
    meta: { description: '[sticky-header] 合并行或列' },
    component: () => import(/* webpackChunkName: "stickyMerge" */ '@/views/sticky-merge.vue'),
  },
  {
    path: '/sticky-multi-level',
    name: 'stickyMultiLevel',
    meta: { description: '[sticky-header] 多级表头' },
    component: () => import(/* webpackChunkName: "stickyMultiLevel" */ '@/views/sticky-multi-level.vue'),
  },
  {
    path: '/sticky-selection',
    name: 'stickySelection',
    meta: { description: '[sticky-header] 多选' },
    component: () => import(/* webpackChunkName: "stickySelection" */ '@/views/sticky-selection.vue'),
  },
  {
    path: '/sticky-sort',
    name: 'stickySort',
    meta: { description: '[sticky-header] 可排序表格' },
    component: () => import(/* webpackChunkName: "stickySort" */ '@/views/sticky-sort.vue'),
  },
  {
    path: '/sticky-sum',
    name: 'stickySum',
    meta: { description: '[sticky-footer] 表尾合计行' },
    component: () => import(/* webpackChunkName: "stickySum" */ '@/views/sticky-sum.vue'),
  },
  {
    path: '/sticky-sum1',
    name: 'stickySum1',
    meta: { description: '[sticky-footer] 表尾合计行（局部注册指令）' },
    component: () => import(/* webpackChunkName: "stickySum1" */ '@/views/sticky-sum1.vue'),
  },
  {
    path: '/sticky-tree',
    name: 'stickyTree',
    meta: { description: '[sticky-header] 树形数据与懒加载' },
    component: () => import(/* webpackChunkName: "stickyTree" */ '@/views/sticky-tree.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})

router.afterEach((to) => {
  document.title = `${to.meta?.description} - ${packageInfo.name} ${packageInfo.version}`
})

export default router
